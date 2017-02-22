# Fluxx API Javascript Client
Simple wrapper around the Fluxx GMS API.
Currently supports v1.

## Example Usage

```javascript

// initialize client
var fluxx = new FluxxService('INSTANCE_NAME', 'CLIENT_ID', 'CLIENT_SECRET');

// set request parameters
var params = {
	'style': 'full',
	'per_page': '100',
	'relation': '{"grantee_org_owner": "compact", "grantee_signatory": "compact"}',
	'filter': '["model_theme_id", "eq", 1340]'
};

// retrieve grant request records
var records = fluxx.list('grant_request', params);

```

