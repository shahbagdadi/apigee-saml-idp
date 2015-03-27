import base64
enc_response = base64.b64decode(flow.getVariable("saml.request"))
flow.setVariable("sf.decoded.request", enc_response)