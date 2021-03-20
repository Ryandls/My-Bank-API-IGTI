import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const router = express.Router();

//POST add
router.post('/', async (req, res) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    account = { id: data.nextID++, ...account };
    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(account);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//get for all
router.get('/', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextID;
    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
//get by id
router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );
    res.send(account);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//delete by id
router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//put update all
router.put('/', async (req, res) => {
  try {
    const account = req.body;
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((a) => a.id === account.id);

    data.accounts[index] = account;

    await writeFile(global.fileName, JSON.stringify(data));
    res.send(account);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//update only balance
router.patch('/updateBalance', async (req, res) => {
  try {
    const account = req.body;
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((a) => a.id === account.id);

    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data));
    res.send(data.accounts[index]);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
