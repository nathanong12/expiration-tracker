
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../db/index.js');
var port = 4000;


app.use(express.static(__dirname + '/../client/dist/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/fetch', function(req, res) {
  db.fetch()
    .then(results => res.send(results));
})

app.post('/save', function(req, res) {
  console.log(req.body)
  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11
  }
  const { itemName, expDay, expMonth, expYear, setReminder, reminderNum, reminderUnit } = req.body;
  const expirationDate = new Date(expYear, months[expMonth], expDay);
  const setReminderDate = (number, unit) => {
    const copyDate = new Date(expirationDate.toString());
    if (unit === 'day(s)') {
      copyDate.setDate(copyDate.getDate() - number);
    }
    if (unit === 'month(s)') {
      copyDate.setMonth(copyDate.getMonth() - number);
    }
    if (unit === 'year(s)') {
      copyDate.setFullYear(copyDate.getFullYear() - number);
    }
    return copyDate;
  }

  let reminderDate;
  if (setReminder) {
    reminderDate = setReminderDate(reminderNum, reminderUnit); 
  } else {
    reminderDate = null;
  }
  const schemaFormat = {
    itemName,
    expirationDate,
    setReminder,
    reminderDate
  }
  // console.log(schemaFormat);

  db.save(schemaFormat);
  res.send('POST request!');
})

app.listen(port, function() {
  console.log(`Listening on ${port}...`)
})