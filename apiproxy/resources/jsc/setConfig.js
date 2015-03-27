// This should come from KVM config - hardcoded here :-) 
//Please update for your environment
context.setVariable("sf.issuer", "http://org-env.apigee.net");
context.setVariable("sf.subject", "sf-email-login@domain.com");
// Salesforce Endpoint : Login URL. Check in Security Controls --> Single Signon Settings
context.setVariable("sf.callback", "https://your-domain.my.salesforce.com?so=00D1a000000HIXB");

context.setVariable("apigee.keystore", "idpKeystore");
context.setVariable("apigee.keyalias", "idpKeystore");


