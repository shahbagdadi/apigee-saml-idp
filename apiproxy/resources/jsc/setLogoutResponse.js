var html = '<html><head></head> <body> You have logged out of Apigee </body> </html>';

context.setVariable("response.content", html);
context.setVariable("response.header.Content-Type", "text/html");