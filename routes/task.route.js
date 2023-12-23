const express = require('express')
const { addTask, getTasks, delTask, updTask } = require('../model/task.model')
const router = express.Router()

router.post('/:uid/tasks/', async (req, res) => {
  const data = req.body
  const uid = req.params.uid
  try {
    const newTask = await addTask(uid, data)
    res.status(201).send({
      msg: newTask
    })
  } catch (error) {
    res.status(500).send({
      msg: 'Internal Server Error'
    })
  }
})
router.get('/:uid/tasks', async (req, res) => {
  const uid = req.params.uid
  try {
    const Tasks = await getTasks(uid)
    res.status(200).send({
      data: Tasks
    })
  } catch (error) {
    res.status(500).send({
      msg: 'Internal Server Error'
    })
  }
})
router.patch('/:uid/tasks/:id', async (req, res) => {
  const data = req.body
  const uid = req.params.uid
  const id = req.params.id
  try {
    await updTask(uid, id, data)
    res.status(200).send({
      msg: 'Task updated'
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({
      msg: 'Internal Server Error'
    })
  }
})
router.delete('/:uid/tasks/:id', async (req, res) => {
  const uid = req.params.uid
  const id = req.params.id
  try {
    await delTask(uid, id)
    res.status(200).send({
      msg: 'Task deleted'
    })
  } catch (err) {
    res.status(500).send({
      msg: 'Internal Server Error'
    })
  }
})

module.exports = router
