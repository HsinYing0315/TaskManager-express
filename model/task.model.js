const admin = require('firebase-admin')
const { cert } = require('firebase-admin/app')
const certJSON = require('../cert.json')
const {
  getFirestore
} = require('firebase-admin/firestore')

admin.initializeApp({
  credential: cert(certJSON)
})
const db = getFirestore()

console.log(db)
const addTask = async (uid, taskData) => {
  try {
    console.log('Added!')
    const userRef = db.collection("u").doc(uid)
    const taskRef = userRef.collection("tasks")
    const newTaskRef = await taskRef.add(taskData)
    console.log(`Document written with id: ${newTaskRef.id}`)
    
    return ((await newTaskRef.get()).data())
  } catch (err) {
    console.error(err)
  }
}
const getTasks = async (uid) => {
  try {
    console.log('successfully get all tasks!')
    db.collection("u").doc(uid).set({
        tasks: []
    }, { merge: true })
    const userRef = db.collection("u").doc(uid)
    const taskRef = userRef.collection("tasks")
    const querySnapshot = await taskRef.get()
    let tasksData = []
    querySnapshot.forEach((task) => {
      tasksData.push({"id": task.id, ...task.data()})
    })
    
    return tasksData
  } catch(err) {
    console.error(err)
  }
}
const updTask = async (uid, id, updData) => {
  try {
    console.log('Updated!')
    const userRef = db.collection("u").doc(uid)
    const taskRef = userRef.collection("tasks").doc(id)
    if(!(await taskRef.get()).exists) {
      console.log("Document not existed...")
    }else {
      await taskRef.set(updData)
    }
  } catch(err) {
    console.error(err)
  }
}
const delTask = async (uid, id) => {
  try {
    console.log('Deleted!')
    const userRef = db.collection("u").doc(uid)
    const taskRef = userRef.collection("tasks").doc(id)
    if(!(await taskRef.get()).exists) {
      console.log("Document not exist...")
    }else{
      await taskRef.delete()
    }
  } catch(err) {
    console.error(err)
  }
}
module.exports = {
  addTask,
  getTasks,
  updTask,
  delTask
}
