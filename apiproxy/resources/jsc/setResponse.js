var acontent = context.getVariable("assertion.content"); 
acontent = acontent.replace('<?xml version="1.0" encoding="UTF-8"?>', '');
context.setVariable("assertion.content",acontent);