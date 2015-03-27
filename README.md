## Example - Apigee as SAML Identity Provider

###Introduction
Security Assertion Markup Language (SAML) is an XML based open  data format for exchanging authentication and authorization data between parties, in particular, between an identity provider and a service provider. 

Apigee Edge enables you to authenticate and authorize apps that are capable of presenting SAML tokens. A SAML token is a digitally signed fragment of XML that presents a set of "assertions". Apigee can function as a service provider (SP) or an Identity Provider (IDP) and provides policies for SAML Assertion generation and validation. 

In this example we will build a sample application where Apigee functions as an Identity Provider (IDP) and Salesforce as a service provider (SP).  The high level flows are as shown below

![SAML FLow](https://github.com/shahbagdadi/apigee-saml-idp/blob/master/images/saml-idp.jpg "SAML Flow")



####License 
The documentation and associated code provided here are covered under [MIT License](https://github.com/shahbagdadi/apigee-saml-idp/blob/master/LICENSE.md)


###Installation 
The steps for installation and configuration required to run this example is as listed below.

####Certificates
One of the first thing you will have to do is to generates the certificates that will be used for digital signatures. You can use openssl to create certificates as shown below.

```
$ mkdir certs
$ cd certs
$ openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 730
```

This will create the files key.pem and cert.pem. Then create a descriptor.properties files
```
$mkdir META-INF
then add the following to the file  /META-INF/descriptor.properties
cert.pem
key.pem
```

Then generate a jar containing your keypair and certificates
```
jar -cf idpKeystore.jar cert.pem key.pem
```

Add decriptor.properties to your jar
```
$ jar -uf idpKeystore.jar META-INF/descriptor.properties
```

Now create a keystore for your environment.
```
$ curl -H "Content-Type: text/xml" \
https://api.enterprise.apigee.com/v1/o/{org_name}/environments/{env_name}/keystores \
-d '<KeyStore name="idpKeystore"/>' -u myname:mypass
```

Now upload the jar file to the keystore
```
$ curl -X POST -H "Content-Type: multipart/form-data" \
-F file="@idpKeystore.jar" \ "https://api.enterprise.apigee.com/v1/o/{org_name}/environments/{env_name}/keystores/idpKeystore/keys?alias={key_alias}&password={key_pass}" \
-u myname:mypass
```

Next we will first do the necessary configurations in Salesforce.
####Salesforce (Service Provider) Setup

1. Sign up for a free developer account at https://developer.salesforce.com/

2. Login and select Security Controls -> Single Sign-On Settings 
![SSO Settings](https://github.com/shahbagdadi/apigee-saml-idp/blob/master/images/step2.png "SSO Settings")


3. Check the SAML enabled check box shown on the screen and add the SAML Single sign-on settings as shown below.
![SSO Settings](https://github.com/shahbagdadi/apigee-saml-idp/blob/master/images/step3.png "SSO Settings")

4. Register a your sub domain in Salesforce
![Domain](https://github.com/shahbagdadi/apigee-saml-idp/blob/master/images/step4.png "Domain")

5. Enable login with your SAML configuration
![Auth](https://github.com/shahbagdadi/apigee-saml-idp/blob/master/images/step5.png "Auth")

6. Logout and access Salesforce using your registered domain. You will see the SAML login option on the page.
![Login](https://github.com/shahbagdadi/apigee-saml-idp/blob/master/images/step6.png "Login")


####Apigee (IDP) Setup

7. Download the proxy source code from https://github.com/shahbagdadi/apigee-saml-idp

8. Change the setConfig.js with configuration for your environment

9. cd to the apigee-saml-idp folder and deploy the proxy using  
python tools/deploy.py -n apigee-saml-idp -u userid:password -o org -e env -d . -p /

10. Open your Salesforce domain and click the “ApigeeSAML” button to authenticate and login using Apigee as an IDP
