# nodeHookerBot

    How to use this bot:

    First step, set your nickname using:
    /set_nickname <nick>

    Then you can use hooks, with wget, curl, e.g

    Bot uses query parameters:
    n - is your nickname, you can use nickname of another user, then this user will recieve message
    msg - is your message that will be displayed in bot message. 

    Example:
    curl "http://<yourdomain>?n=max&msg=test"

    Use case:
    bash ./<very_long_task_or_script>.sh && curl "http://<>?n=max&msg=task_finished"

    Note that spaces is not allowed in query parameters, use '+' instead
