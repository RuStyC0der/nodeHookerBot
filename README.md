# nodeHookerBot

How to use this bot:

First step, set your nickname using:
/set_nickname <nick>

Then you can use hooks, with wget, curl, e.g

Bot uses query parameters:
n - is your nickname, you can use nickname of another user, then this user will recieve message
msg - is your message that will be displayed in bot message. 

Example:
curl "http://yourdomain.com?n=max&msg=test"

Use case:
bash ./<very_long_task_or_script>.sh && curl "http://yourdomain.com?n=max&msg=task_finished" (curl will be executed only if previous task was finished with 0 status code)
bash ./<very_long_task_or_script>.sh ; curl "http://yourdomain.com?n=max&msg=task_finished" (curl will be executed even if previous task was finished with non-zero status code)

Note that spaces is not allowed in query parameters, use '+' instead

If username is undefined then message will be sent to broadcast chat (if defined in .env), request without username will be rejected

