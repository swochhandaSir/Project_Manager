import('../config/db.js')
  .then(d => d.default())
  .then(() => import('../services/dueReminders.js'))
  .then(m => m.runDueRemindersOnce())
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });