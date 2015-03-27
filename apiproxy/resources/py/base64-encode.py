import base64
enc_response = base64.b64encode(flow.getVariable("sf.response"))
flow.setVariable("sf.response", enc_response)