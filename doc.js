
const startupMessage = `
How to use this bot:

First step, set your nickname using:
/set_nickname <nick>

Then you can use hooks, with wget, curl, e.g

Bot uses query parameters:
n - is your nickname, you can use nickname of another user, then this user will recieve message
msg - is your message that will be displayed in bot message. 

Example:
curl "http://<>?n=max&msg=test"

Use case:
bash ./<very_long_task_or_script>.sh && curl "http://<>?n=max&msg=task_finished"

Note that spaces is not allowed in query parameters, use '+' instead

If username is undefined then message will be sent to broadcast chat (if defined), request without username will be rejected

`

const commandReference = `
ping - check if bot is online

set_nickname - set your nickname, you can set multiple nick names and use this in diferent cases

set_admin <pass> - set you as admin, admin recives all mesages from all users
unset_admin - remove admin rights

help - displays help message
`




module.exports = {
    startupMessage,
    commandReference
}