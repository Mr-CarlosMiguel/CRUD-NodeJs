const router = require('express').Router()
const Person = require('../models/Person')

// create data
router.post('/', async (req, res) => {
  // dentro do req temos o body e podemos receber essas informações
  const { name, salary, approved } = req.body

  if (!name) {
    res.status(422).json({ message: 'O nome é obrigatorio bb' })
    return
  }

  const person = {
    name,
    salary,
    approved,
  }
  try {
    // criando dados no banco de dados
    await Person.create(person)

    //esse status significa que criou com sucesso o metodo post
    res.status(201).json({ message: 'pessoa inserida com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error })
    // esse metodo não é recomendado enviar para API, utilizando para teste. Melhor seria criar arquivo de log
  }
})

//read - leitura dos dados
router.get('/', async (req, res) => {
  try {
    const people = await Person.find()
    res.status(200).json({ people })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:id', async (req, res) => {
  //extrair o dado da requisição, pela url = req.params
  const id = req.params.id
  try {
    const person = await Person.findOne({ _id: id })
    if (!person) {
      res.status(422).json({ message: 'Usuario não encontrado' })
      return
    }
    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// update - atualização de dados (PUT ou PATCH)
router.patch('/:id', async (req, res) => {
  const { name, salary, approved } = req.body
  const id = req.params.id

  const person = {
    name,
    salary,
    approved,
  }
  try {
    const updatePerson = await Person.updateOne({ _id: id }, person)

    if (updatePerson.matchedCount === 0) {
      res.status(422).json({ mensage: 'Usuario não encontrado' })
      return
    }
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// deletando usuario
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const person = await Person.findOne({ _id: id })
  if (!person) {
    res.status(422).json({ mensage: 'Usuario não encontrado' })
    return
  }
  try {
    await Person.deleteOne({_id: id})
    res.status(200).json({message: 'Usuario deletado com sucesso'})
    
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router
