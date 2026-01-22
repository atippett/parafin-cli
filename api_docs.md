# Parafin API Documentation

*Exported from https://docs.parafin.com/api-reference*

*Generated on: 2026-01-22T05:30:13.523Z*

---

## Redeem auth token

**POST** `/v1/auth/redeem_token`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Redeem auth tokencURLcurl --request POST \
  --url https://api.parafin.com/v1/auth/redeem_token \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "person_id": "<string>",
  "person_external_id": "<string>",
  "read_only": true
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/auth/redeem_token \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "person_id": "<string>",
  "person_external_id": "<string>",
  "read_only": true
}
'
```

```json
200400default{
  "auth_token": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "bearer_token": "<string>"
}
```

```json
{
  "auth_token": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "bearer_token": "<string>"
}
```

*Source: https://docs.parafin.com/api-reference/auth/redeem-auth-token*

---

## Get Balance Transaction

**POST** `/v1/balance_transactions/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get Balance TransactioncURLcurl --request GET \
  --url https://api.parafin.com/v1/balance_transactions/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/balance_transactions/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "amount": 123,
  "currency": "USD",
  "originator": "parafin",
  "direction": "credit",
  "payment_method": "ach",
  "status": "pending",
  "created_at": "2023-11-07T05:31:56Z",
  "effective_date": "2023-12-25",
  "type": "funding",
  "transaction_detail": {
    "funding_detail": {
      "business_parafin_id": "<string>",
      "business_external_id": "<string>",
      "capital_product_id": "<string>"
    },
    "refund_detail": {
      "business_parafin_id": "<string>",
      "business_external_id": "<string>",
      "capital_product_id": "<string>"
    }
  },
  "description": "<string>"
}
```

```json
{
  "id": "<string>",
  "amount": 123,
  "currency": "USD",
  "originator": "parafin",
  "direction": "credit",
  "payment_method": "ach",
  "status": "pending",
  "created_at": "2023-11-07T05:31:56Z",
  "effective_date": "2023-12-25",
  "type": "funding",
  "transaction_detail": {
    "funding_detail": {
      "business_parafin_id": "<string>",
      "business_external_id": "<string>",
      "capital_product_id": "<string>"
    },
    "refund_detail": {
      "business_parafin_id": "<string>",
      "business_external_id": "<string>",
      "capital_product_id": "<string>"
    }
  },
  "description": "<string>"
}
```

*Source: https://docs.parafin.com/api-reference/balance-transactions/get-balance-transaction*

---

## List Balance Transactions

**POST** `/v1/balance_transactions`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List Balance TransactionscURLcurl --request GET \
  --url https://api.parafin.com/v1/balance_transactions \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/balance_transactions \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "amount": 123,
      "currency": "USD",
      "originator": "parafin",
      "direction": "credit",
      "payment_method": "ach",
      "status": "pending",
      "created_at": "2023-11-07T05:31:56Z",
      "effective_date": "2023-12-25",
      "type": "funding",
      "transaction_detail": {
        "funding_detail": {
          "business_parafin_id": "<string>",
          "business_external_id": "<string>",
          "capital_product_id": "<string>"
        },
        "refund_detail": {
          "business_parafin_id": "<string>",
          "business_external_id": "<string>",
          "capital_product_id": "<string>"
        }
      },
      "description": "<string>"
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "amount": 123,
      "currency": "USD",
      "originator": "parafin",
      "direction": "credit",
      "payment_method": "ach",
      "status": "pending",
      "created_at": "2023-11-07T05:31:56Z",
      "effective_date": "2023-12-25",
      "type": "funding",
      "transaction_detail": {
        "funding_detail": {
          "business_parafin_id": "<string>",
          "business_external_id": "<string>",
          "capital_product_id": "<string>"
        },
        "refund_detail": {
          "business_parafin_id": "<string>",
          "business_external_id": "<string>",
          "capital_product_id": "<string>"
        }
      },
      "description": "<string>"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/balance-transactions/list-balance-transactions*

---

## Create multiple Bank Accounts

**POST** `/v1/bank_accounts/batch_create`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create multiple Bank AccountscURLcurl --request POST \
  --url https://api.parafin.com/v1/bank_accounts/batch_create \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requests": [
    {
      "routing_number": "<string>",
      "account_number": {
        "last4": "<string>",
        "full": "<string>"
      },
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "currency": "USD"
    }
  ]
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/bank_accounts/batch_create \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requests": [
    {
      "routing_number": "<string>",
      "account_number": {
        "last4": "<string>",
        "full": "<string>"
      },
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "currency": "USD"
    }
  ]
}
'
```

```json
200400default{
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "routing_number": "<string>",
      "account_number": {
        "last4": "<string>",
        "full": "<string>"
      },
      "status": "new"
    }
  ]
}
```

```json
{
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "routing_number": "<string>",
      "account_number": {
        "last4": "<string>",
        "full": "<string>"
      },
      "status": "new"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/bank-accounts/create-multiple-bank-accounts*

---

## List Bank Accounts

**POST** `/v1/bank_accounts`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List Bank AccountscURLcurl --request GET \
  --url https://api.parafin.com/v1/bank_accounts \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/bank_accounts \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "routing_number": "<string>",
      "account_number": {
        "last4": "<string>",
        "full": "<string>"
      },
      "status": "new"
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "routing_number": "<string>",
      "account_number": {
        "last4": "<string>",
        "full": "<string>"
      },
      "status": "new"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/bank-accounts/list-bank-accounts*

---

## Create Bank Account

**POST** `/v1/bank_accounts`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create Bank AccountcURLcurl --request POST \
  --url https://api.parafin.com/v1/bank_accounts \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "routing_number": "<string>",
  "account_number": {
    "last4": "<string>",
    "full": "<string>"
  },
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "currency": "USD"
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/bank_accounts \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "routing_number": "<string>",
  "account_number": {
    "last4": "<string>",
    "full": "<string>"
  },
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "currency": "USD"
}
'
```

```json
200400default{
  "id": "<string>",
  "business_id": "<string>",
  "routing_number": "<string>",
  "account_number": {
    "last4": "<string>",
    "full": "<string>"
  },
  "status": "new"
}
```

```json
{
  "id": "<string>",
  "business_id": "<string>",
  "routing_number": "<string>",
  "account_number": {
    "last4": "<string>",
    "full": "<string>"
  },
  "status": "new"
}
```

*Source: https://docs.parafin.com/api-reference/bank-accounts/create-bank-account*

---

## Get Bank Account

**POST** `/v1/bank_accounts/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get Bank AccountcURLcurl --request GET \
  --url https://api.parafin.com/v1/bank_accounts/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/bank_accounts/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "business_id": "<string>",
  "routing_number": "<string>",
  "account_number": {
    "last4": "<string>",
    "full": "<string>"
  },
  "status": "new"
}
```

```json
{
  "id": "<string>",
  "business_id": "<string>",
  "routing_number": "<string>",
  "account_number": {
    "last4": "<string>",
    "full": "<string>"
  },
  "status": "new"
}
```

*Source: https://docs.parafin.com/api-reference/bank-accounts/get-bank-account*

---

## Verify Bank Account (Sandbox)

**POST** `/v1/sandbox/bank_account/{id}/verify`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Verify Bank Account (Sandbox)cURLcurl --request POST \
  --url https://api.parafin.com/v1/sandbox/bank_account/{id}/verify \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/sandbox/bank_account/{id}/verify \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "business_id": "<string>",
  "routing_number": "<string>",
  "account_number": {
    "last4": "<string>",
    "full": "<string>"
  },
  "status": "new"
}
```

```json
{
  "id": "<string>",
  "business_id": "<string>",
  "routing_number": "<string>",
  "account_number": {
    "last4": "<string>",
    "full": "<string>"
  },
  "status": "new"
}
```

*Source: https://docs.parafin.com/api-reference/bank-accounts/verify-bank-account-sandbox*

---

## Create multiple Businesses

**POST** `/v1/businesses/batch_create`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create multiple BusinessescURLcurl --request POST \
  --url https://api.parafin.com/v1/businesses/batch_create \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requests": [
    {
      "legal_name": "<string>",
      "dba_name": "<string>",
      "address": {
        "line1": "<string>",
        "city": "<string>",
        "state": "AL",
        "country": "<string>",
        "postal_code": "<string>",
        "line2": "<string>"
      },
      "established_date": "2023-12-25",
      "incorporation_state": "AL",
      "incorporation_type": "llc",
      "mcc": "<string>",
      "business_external_id": "<string>",
      "external_id": "<string>",
      "custom_data": {}
    }
  ]
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/businesses/batch_create \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requests": [
    {
      "legal_name": "<string>",
      "dba_name": "<string>",
      "address": {
        "line1": "<string>",
        "city": "<string>",
        "state": "AL",
        "country": "<string>",
        "postal_code": "<string>",
        "line2": "<string>"
      },
      "established_date": "2023-12-25",
      "incorporation_state": "AL",
      "incorporation_type": "llc",
      "mcc": "<string>",
      "business_external_id": "<string>",
      "external_id": "<string>",
      "custom_data": {}
    }
  ]
}
'
```

```json
200400default{
  "results": [
    {
      "id": "<string>",
      "legal_name": "<string>",
      "dba_name": "<string>",
      "address": {
        "line1": "<string>",
        "city": "<string>",
        "state": "AL",
        "country": "<string>",
        "postal_code": "<string>",
        "line2": "<string>"
      },
      "established_date": "2023-12-25",
      "incorporation_state": "AL",
      "incorporation_type": "llc",
      "mcc": "<string>",
      "linked_persons": [
        {
          "id": "<string>",
          "relationship": {
            "is_beneficial_owner": true,
            "is_representative": true
          }
        }
      ],
      "external_id": "<string>",
      "custom_data": {},
      "settings": {
        "net_settlement": "active"
      }
    }
  ]
}
```

```json
{
  "results": [
    {
      "id": "<string>",
      "legal_name": "<string>",
      "dba_name": "<string>",
      "address": {
        "line1": "<string>",
        "city": "<string>",
        "state": "AL",
        "country": "<string>",
        "postal_code": "<string>",
        "line2": "<string>"
      },
      "established_date": "2023-12-25",
      "incorporation_state": "AL",
      "incorporation_type": "llc",
      "mcc": "<string>",
      "linked_persons": [
        {
          "id": "<string>",
          "relationship": {
            "is_beneficial_owner": true,
            "is_representative": true
          }
        }
      ],
      "external_id": "<string>",
      "custom_data": {},
      "settings": {
        "net_settlement": "active"
      }
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/businesses/create-multiple-businesses*

---

## List Businesses

**POST** `/v1/businesses`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List BusinessescURLcurl --request GET \
  --url https://api.parafin.com/v1/businesses \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/businesses \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "legal_name": "<string>",
      "dba_name": "<string>",
      "address": {
        "line1": "<string>",
        "city": "<string>",
        "state": "AL",
        "country": "<string>",
        "postal_code": "<string>",
        "line2": "<string>"
      },
      "established_date": "2023-12-25",
      "incorporation_state": "AL",
      "incorporation_type": "llc",
      "mcc": "<string>",
      "linked_persons": [
        {
          "id": "<string>",
          "relationship": {
            "is_beneficial_owner": true,
            "is_representative": true
          }
        }
      ],
      "external_id": "<string>",
      "custom_data": {},
      "settings": {
        "net_settlement": "active"
      }
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "legal_name": "<string>",
      "dba_name": "<string>",
      "address": {
        "line1": "<string>",
        "city": "<string>",
        "state": "AL",
        "country": "<string>",
        "postal_code": "<string>",
        "line2": "<string>"
      },
      "established_date": "2023-12-25",
      "incorporation_state": "AL",
      "incorporation_type": "llc",
      "mcc": "<string>",
      "linked_persons": [
        {
          "id": "<string>",
          "relationship": {
            "is_beneficial_owner": true,
            "is_representative": true
          }
        }
      ],
      "external_id": "<string>",
      "custom_data": {},
      "settings": {
        "net_settlement": "active"
      }
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/businesses/list-businesses*

---

## Create Business

**POST** `/v1/businesses`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create BusinesscURLcurl --request POST \
  --url https://api.parafin.com/v1/businesses \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "legal_name": "<string>",
  "dba_name": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "established_date": "2023-12-25",
  "incorporation_state": "AL",
  "incorporation_type": "llc",
  "mcc": "<string>",
  "business_external_id": "<string>",
  "external_id": "<string>",
  "custom_data": {}
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/businesses \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "legal_name": "<string>",
  "dba_name": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "established_date": "2023-12-25",
  "incorporation_state": "AL",
  "incorporation_type": "llc",
  "mcc": "<string>",
  "business_external_id": "<string>",
  "external_id": "<string>",
  "custom_data": {}
}
'
```

```json
200400default{
  "id": "<string>",
  "legal_name": "<string>",
  "dba_name": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "established_date": "2023-12-25",
  "incorporation_state": "AL",
  "incorporation_type": "llc",
  "mcc": "<string>",
  "linked_persons": [
    {
      "id": "<string>",
      "relationship": {
        "is_beneficial_owner": true,
        "is_representative": true
      }
    }
  ],
  "external_id": "<string>",
  "custom_data": {},
  "settings": {
    "net_settlement": "active"
  }
}
```

```json
{
  "id": "<string>",
  "legal_name": "<string>",
  "dba_name": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "established_date": "2023-12-25",
  "incorporation_state": "AL",
  "incorporation_type": "llc",
  "mcc": "<string>",
  "linked_persons": [
    {
      "id": "<string>",
      "relationship": {
        "is_beneficial_owner": true,
        "is_representative": true
      }
    }
  ],
  "external_id": "<string>",
  "custom_data": {},
  "settings": {
    "net_settlement": "active"
  }
}
```

*Source: https://docs.parafin.com/api-reference/businesses/create-business*

---

## Get Business

**POST** `/v1/businesses/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get BusinesscURLcurl --request GET \
  --url https://api.parafin.com/v1/businesses/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/businesses/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "legal_name": "<string>",
  "dba_name": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "established_date": "2023-12-25",
  "incorporation_state": "AL",
  "incorporation_type": "llc",
  "mcc": "<string>",
  "linked_persons": [
    {
      "id": "<string>",
      "relationship": {
        "is_beneficial_owner": true,
        "is_representative": true
      }
    }
  ],
  "external_id": "<string>",
  "custom_data": {},
  "settings": {
    "net_settlement": "active"
  }
}
```

```json
{
  "id": "<string>",
  "legal_name": "<string>",
  "dba_name": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "established_date": "2023-12-25",
  "incorporation_state": "AL",
  "incorporation_type": "llc",
  "mcc": "<string>",
  "linked_persons": [
    {
      "id": "<string>",
      "relationship": {
        "is_beneficial_owner": true,
        "is_representative": true
      }
    }
  ],
  "external_id": "<string>",
  "custom_data": {},
  "settings": {
    "net_settlement": "active"
  }
}
```

*Source: https://docs.parafin.com/api-reference/businesses/get-business*

---

## Update Business

**POST** `/v1/businesses/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Update BusinesscURLcurl --request PATCH \
  --url https://api.parafin.com/v1/businesses/{id} \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "legal_name": "<string>",
  "dba_name": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "established_date": "2023-12-25",
  "incorporation_state": "AL",
  "incorporation_type": "llc",
  "mcc": "<string>",
  "custom_data": {},
  "settings": {
    "net_settlement": "active"
  }
}
'
```

```bash
curl --request PATCH \
  --url https://api.parafin.com/v1/businesses/{id} \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "legal_name": "<string>",
  "dba_name": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "established_date": "2023-12-25",
  "incorporation_state": "AL",
  "incorporation_type": "llc",
  "mcc": "<string>",
  "custom_data": {},
  "settings": {
    "net_settlement": "active"
  }
}
'
```

```json
200400default{
  "id": "<string>",
  "legal_name": "<string>",
  "dba_name": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "established_date": "2023-12-25",
  "incorporation_state": "AL",
  "incorporation_type": "llc",
  "mcc": "<string>",
  "linked_persons": [
    {
      "id": "<string>",
      "relationship": {
        "is_beneficial_owner": true,
        "is_representative": true
      }
    }
  ],
  "external_id": "<string>",
  "custom_data": {},
  "settings": {
    "net_settlement": "active"
  }
}
```

```json
{
  "id": "<string>",
  "legal_name": "<string>",
  "dba_name": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "established_date": "2023-12-25",
  "incorporation_state": "AL",
  "incorporation_type": "llc",
  "mcc": "<string>",
  "linked_persons": [
    {
      "id": "<string>",
      "relationship": {
        "is_beneficial_owner": true,
        "is_representative": true
      }
    }
  ],
  "external_id": "<string>",
  "custom_data": {},
  "settings": {
    "net_settlement": "active"
  }
}
```

*Source: https://docs.parafin.com/api-reference/businesses/update-business*

---

## Approve Capital Product Application in Manual Review (Sandbox)

**POST** `/v1/sandbox/capital_product_application/{id}/approve`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Approve Capital Product Application in Manual Review (Sandbox)cURLcurl --request POST \
  --url https://api.parafin.com/v1/sandbox/capital_product_application/{id}/approve \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/sandbox/capital_product_application/{id}/approve \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "capital_product_offer_id": "<string>",
  "offer_id": "<string>",
  "application_type": "merchant_cash_advance",
  "start_date": "2023-12-25",
  "status": "created",
  "updated_at": "2023-11-07T05:31:56Z",
  "capital_product_id": "<string>",
  "started_at": "2023-11-07T05:31:56Z",
  "submitted_at": "2023-11-07T05:31:56Z",
  "approved_at": "2023-11-07T05:31:56Z",
  "denied_at": "2023-11-07T05:31:56Z",
  "funded_at": "2023-11-07T05:31:56Z",
  "expired_at": "2023-11-07T05:31:56Z",
  "cancelled_at": "2023-11-07T05:31:56Z",
  "withdrawn_at": "2023-11-07T05:31:56Z"
}
```

```json
{
  "id": "<string>",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "capital_product_offer_id": "<string>",
  "offer_id": "<string>",
  "application_type": "merchant_cash_advance",
  "start_date": "2023-12-25",
  "status": "created",
  "updated_at": "2023-11-07T05:31:56Z",
  "capital_product_id": "<string>",
  "started_at": "2023-11-07T05:31:56Z",
  "submitted_at": "2023-11-07T05:31:56Z",
  "approved_at": "2023-11-07T05:31:56Z",
  "denied_at": "2023-11-07T05:31:56Z",
  "funded_at": "2023-11-07T05:31:56Z",
  "expired_at": "2023-11-07T05:31:56Z",
  "cancelled_at": "2023-11-07T05:31:56Z",
  "withdrawn_at": "2023-11-07T05:31:56Z"
}
```

*Source: https://docs.parafin.com/api-reference/capital-product-applications/approve-capital-product-application-in-manual-review-sandbox*

---

## Deny Capital Product Application in Manual Review (Sandbox)

**POST** `/v1/sandbox/capital_product_application/{id}/deny`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Deny Capital Product Application in Manual Review (Sandbox)cURLcurl --request POST \
  --url https://api.parafin.com/v1/sandbox/capital_product_application/{id}/deny \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/sandbox/capital_product_application/{id}/deny \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "capital_product_offer_id": "<string>",
  "offer_id": "<string>",
  "application_type": "merchant_cash_advance",
  "start_date": "2023-12-25",
  "status": "created",
  "updated_at": "2023-11-07T05:31:56Z",
  "capital_product_id": "<string>",
  "started_at": "2023-11-07T05:31:56Z",
  "submitted_at": "2023-11-07T05:31:56Z",
  "approved_at": "2023-11-07T05:31:56Z",
  "denied_at": "2023-11-07T05:31:56Z",
  "funded_at": "2023-11-07T05:31:56Z",
  "expired_at": "2023-11-07T05:31:56Z",
  "cancelled_at": "2023-11-07T05:31:56Z",
  "withdrawn_at": "2023-11-07T05:31:56Z"
}
```

```json
{
  "id": "<string>",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "capital_product_offer_id": "<string>",
  "offer_id": "<string>",
  "application_type": "merchant_cash_advance",
  "start_date": "2023-12-25",
  "status": "created",
  "updated_at": "2023-11-07T05:31:56Z",
  "capital_product_id": "<string>",
  "started_at": "2023-11-07T05:31:56Z",
  "submitted_at": "2023-11-07T05:31:56Z",
  "approved_at": "2023-11-07T05:31:56Z",
  "denied_at": "2023-11-07T05:31:56Z",
  "funded_at": "2023-11-07T05:31:56Z",
  "expired_at": "2023-11-07T05:31:56Z",
  "cancelled_at": "2023-11-07T05:31:56Z",
  "withdrawn_at": "2023-11-07T05:31:56Z"
}
```

*Source: https://docs.parafin.com/api-reference/capital-product-applications/deny-capital-product-application-in-manual-review-sandbox*

---

## Get Capital Product Application

**POST** `/v1/capital_product_applications/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get Capital Product ApplicationcURLcurl --request GET \
  --url https://api.parafin.com/v1/capital_product_applications/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/capital_product_applications/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "capital_product_offer_id": "<string>",
  "offer_id": "<string>",
  "application_type": "merchant_cash_advance",
  "start_date": "2023-12-25",
  "status": "created",
  "updated_at": "2023-11-07T05:31:56Z",
  "capital_product_id": "<string>",
  "started_at": "2023-11-07T05:31:56Z",
  "submitted_at": "2023-11-07T05:31:56Z",
  "approved_at": "2023-11-07T05:31:56Z",
  "denied_at": "2023-11-07T05:31:56Z",
  "funded_at": "2023-11-07T05:31:56Z",
  "expired_at": "2023-11-07T05:31:56Z",
  "cancelled_at": "2023-11-07T05:31:56Z",
  "withdrawn_at": "2023-11-07T05:31:56Z"
}
```

```json
{
  "id": "<string>",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "capital_product_offer_id": "<string>",
  "offer_id": "<string>",
  "application_type": "merchant_cash_advance",
  "start_date": "2023-12-25",
  "status": "created",
  "updated_at": "2023-11-07T05:31:56Z",
  "capital_product_id": "<string>",
  "started_at": "2023-11-07T05:31:56Z",
  "submitted_at": "2023-11-07T05:31:56Z",
  "approved_at": "2023-11-07T05:31:56Z",
  "denied_at": "2023-11-07T05:31:56Z",
  "funded_at": "2023-11-07T05:31:56Z",
  "expired_at": "2023-11-07T05:31:56Z",
  "cancelled_at": "2023-11-07T05:31:56Z",
  "withdrawn_at": "2023-11-07T05:31:56Z"
}
```

*Source: https://docs.parafin.com/api-reference/capital-product-applications/get-capital-product-application*

---

## List Capital Product Applications

**POST** `/v1/capital_product_applications`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List Capital Product ApplicationscURLcurl --request GET \
  --url https://api.parafin.com/v1/capital_product_applications \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/capital_product_applications \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "business_external_id": "<string>",
      "capital_product_offer_id": "<string>",
      "offer_id": "<string>",
      "application_type": "merchant_cash_advance",
      "start_date": "2023-12-25",
      "status": "created",
      "updated_at": "2023-11-07T05:31:56Z",
      "capital_product_id": "<string>",
      "started_at": "2023-11-07T05:31:56Z",
      "submitted_at": "2023-11-07T05:31:56Z",
      "approved_at": "2023-11-07T05:31:56Z",
      "denied_at": "2023-11-07T05:31:56Z",
      "funded_at": "2023-11-07T05:31:56Z",
      "expired_at": "2023-11-07T05:31:56Z",
      "cancelled_at": "2023-11-07T05:31:56Z",
      "withdrawn_at": "2023-11-07T05:31:56Z"
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "business_external_id": "<string>",
      "capital_product_offer_id": "<string>",
      "offer_id": "<string>",
      "application_type": "merchant_cash_advance",
      "start_date": "2023-12-25",
      "status": "created",
      "updated_at": "2023-11-07T05:31:56Z",
      "capital_product_id": "<string>",
      "started_at": "2023-11-07T05:31:56Z",
      "submitted_at": "2023-11-07T05:31:56Z",
      "approved_at": "2023-11-07T05:31:56Z",
      "denied_at": "2023-11-07T05:31:56Z",
      "funded_at": "2023-11-07T05:31:56Z",
      "expired_at": "2023-11-07T05:31:56Z",
      "cancelled_at": "2023-11-07T05:31:56Z",
      "withdrawn_at": "2023-11-07T05:31:56Z"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/capital-product-applications/list-capital-product-applications*

---

## Get Capital Product Offer

**POST** `/v1/capital_product_offers/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get Capital Product OffercURLcurl --request GET \
  --url https://api.parafin.com/v1/capital_product_offers/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/capital_product_offers/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "business_id": "<string>",
  "business_external_id": "<string>",
  "business_parafin_id": "<string>",
  "product_type": "merchant_cash_advance",
  "active": true,
  "is_marketable": true,
  "date": "2023-12-25",
  "total_approved_amount": 123,
  "max_fee_amount": 123,
  "max_fee_discount_amount": 123,
  "max_payment_rate": 123,
  "max_fee_multiplier": 123,
  "expiration_date": "2023-12-25",
  "is_top_up": true,
  "campaign_type": "pre_approved",
  "offer_url": "<string>",
  "term_loan_offer_details": {
    "schedule": "daily",
    "fixed_amount": 123,
    "term_length_months": 123
  }
}
```

```json
{
  "id": "<string>",
  "business_id": "<string>",
  "business_external_id": "<string>",
  "business_parafin_id": "<string>",
  "product_type": "merchant_cash_advance",
  "active": true,
  "is_marketable": true,
  "date": "2023-12-25",
  "total_approved_amount": 123,
  "max_fee_amount": 123,
  "max_fee_discount_amount": 123,
  "max_payment_rate": 123,
  "max_fee_multiplier": 123,
  "expiration_date": "2023-12-25",
  "is_top_up": true,
  "campaign_type": "pre_approved",
  "offer_url": "<string>",
  "term_loan_offer_details": {
    "schedule": "daily",
    "fixed_amount": 123,
    "term_length_months": 123
  }
}
```

*Source: https://docs.parafin.com/api-reference/capital-product-offers/get-capital-product-offer*

---

## List Capital Product Offers

**POST** `/v1/capital_product_offers`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List Capital Product OfferscURLcurl --request GET \
  --url https://api.parafin.com/v1/capital_product_offers \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/capital_product_offers \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "business_external_id": "<string>",
      "business_parafin_id": "<string>",
      "product_type": "merchant_cash_advance",
      "active": true,
      "is_marketable": true,
      "date": "2023-12-25",
      "total_approved_amount": 123,
      "max_fee_amount": 123,
      "max_fee_discount_amount": 123,
      "max_payment_rate": 123,
      "max_fee_multiplier": 123,
      "expiration_date": "2023-12-25",
      "is_top_up": true,
      "campaign_type": "pre_approved",
      "offer_url": "<string>",
      "term_loan_offer_details": {
        "schedule": "daily",
        "fixed_amount": 123,
        "term_length_months": 123
      }
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "business_external_id": "<string>",
      "business_parafin_id": "<string>",
      "product_type": "merchant_cash_advance",
      "active": true,
      "is_marketable": true,
      "date": "2023-12-25",
      "total_approved_amount": 123,
      "max_fee_amount": 123,
      "max_fee_discount_amount": 123,
      "max_payment_rate": 123,
      "max_fee_multiplier": 123,
      "expiration_date": "2023-12-25",
      "is_top_up": true,
      "campaign_type": "pre_approved",
      "offer_url": "<string>",
      "term_loan_offer_details": {
        "schedule": "daily",
        "fixed_amount": 123,
        "term_length_months": 123
      }
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/capital-product-offers/list-capital-product-offers*

---

## Close Capital Product Offer (Sandbox)

**POST** `/v1/sandbox/capital_product_offers/{id}/close`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Close Capital Product Offer (Sandbox)cURLcurl --request POST \
  --url https://api.parafin.com/v1/sandbox/capital_product_offers/{id}/close \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/sandbox/capital_product_offers/{id}/close \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "business_id": "<string>",
  "business_external_id": "<string>",
  "business_parafin_id": "<string>",
  "product_type": "merchant_cash_advance",
  "active": true,
  "is_marketable": true,
  "date": "2023-12-25",
  "total_approved_amount": 123,
  "max_fee_amount": 123,
  "max_fee_discount_amount": 123,
  "max_payment_rate": 123,
  "max_fee_multiplier": 123,
  "expiration_date": "2023-12-25",
  "is_top_up": true,
  "campaign_type": "pre_approved",
  "offer_url": "<string>",
  "term_loan_offer_details": {
    "schedule": "daily",
    "fixed_amount": 123,
    "term_length_months": 123
  }
}
```

```json
{
  "id": "<string>",
  "business_id": "<string>",
  "business_external_id": "<string>",
  "business_parafin_id": "<string>",
  "product_type": "merchant_cash_advance",
  "active": true,
  "is_marketable": true,
  "date": "2023-12-25",
  "total_approved_amount": 123,
  "max_fee_amount": 123,
  "max_fee_discount_amount": 123,
  "max_payment_rate": 123,
  "max_fee_multiplier": 123,
  "expiration_date": "2023-12-25",
  "is_top_up": true,
  "campaign_type": "pre_approved",
  "offer_url": "<string>",
  "term_loan_offer_details": {
    "schedule": "daily",
    "fixed_amount": 123,
    "term_length_months": 123
  }
}
```

*Source: https://docs.parafin.com/api-reference/capital-product-offers/close-capital-product-offer-sandbox*

---

## Create Capital Product Offer (Sandbox)

**POST** `/v1/sandbox/capital_product_offers`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create Capital Product Offer (Sandbox)cURLcurl --request POST \
  --url https://api.parafin.com/v1/sandbox/capital_product_offers \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "business_parafin_id": "<string>",
  "product_type": "merchant_cash_advance",
  "is_top_up": true,
  "include_fee_discount": true,
  "max_offer_amount": 123,
  "campaign_type": "pre_approved"
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/sandbox/capital_product_offers \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "business_parafin_id": "<string>",
  "product_type": "merchant_cash_advance",
  "is_top_up": true,
  "include_fee_discount": true,
  "max_offer_amount": 123,
  "campaign_type": "pre_approved"
}
'
```

```json
200400default{
  "id": "<string>",
  "business_id": "<string>",
  "business_external_id": "<string>",
  "business_parafin_id": "<string>",
  "product_type": "merchant_cash_advance",
  "active": true,
  "is_marketable": true,
  "date": "2023-12-25",
  "total_approved_amount": 123,
  "max_fee_amount": 123,
  "max_fee_discount_amount": 123,
  "max_payment_rate": 123,
  "max_fee_multiplier": 123,
  "expiration_date": "2023-12-25",
  "is_top_up": true,
  "campaign_type": "pre_approved",
  "offer_url": "<string>",
  "term_loan_offer_details": {
    "schedule": "daily",
    "fixed_amount": 123,
    "term_length_months": 123
  }
}
```

```json
{
  "id": "<string>",
  "business_id": "<string>",
  "business_external_id": "<string>",
  "business_parafin_id": "<string>",
  "product_type": "merchant_cash_advance",
  "active": true,
  "is_marketable": true,
  "date": "2023-12-25",
  "total_approved_amount": 123,
  "max_fee_amount": 123,
  "max_fee_discount_amount": 123,
  "max_payment_rate": 123,
  "max_fee_multiplier": 123,
  "expiration_date": "2023-12-25",
  "is_top_up": true,
  "campaign_type": "pre_approved",
  "offer_url": "<string>",
  "term_loan_offer_details": {
    "schedule": "daily",
    "fixed_amount": 123,
    "term_length_months": 123
  }
}
```

*Source: https://docs.parafin.com/api-reference/capital-product-offers/create-capital-product-offer-sandbox*

---

## List Capital Product Payments

**POST** `/v1/capital_product_payments`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List Capital Product PaymentscURLcurl --request GET \
  --url https://api.parafin.com/v1/capital_product_payments \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/capital_product_payments \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "capital_product_id": "<string>",
      "amount": 123,
      "started_at": "2023-11-07T05:31:56Z",
      "state": "pending"
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "capital_product_id": "<string>",
      "amount": 123,
      "started_at": "2023-11-07T05:31:56Z",
      "state": "pending"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/capital-product-payments/list-capital-product-payments*

---

## Create Capital Product Payment (Sandbox)

**POST** `/v1/sandbox/capital_product_payments`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create Capital Product Payment (Sandbox)cURLcurl --request POST \
  --url https://api.parafin.com/v1/sandbox/capital_product_payments \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "capital_product_id": "<string>",
  "state": "pending",
  "payment_type": "fixed_amount",
  "amount": 123,
  "started_at": "2023-11-07T05:31:56Z"
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/sandbox/capital_product_payments \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "capital_product_id": "<string>",
  "state": "pending",
  "payment_type": "fixed_amount",
  "amount": 123,
  "started_at": "2023-11-07T05:31:56Z"
}
'
```

```json
200400default{
  "id": "<string>",
  "capital_product_id": "<string>",
  "state": "pending",
  "amount": 123,
  "started_at": "2023-11-07T05:31:56Z"
}
```

```json
{
  "id": "<string>",
  "capital_product_id": "<string>",
  "state": "pending",
  "amount": 123,
  "started_at": "2023-11-07T05:31:56Z"
}
```

*Source: https://docs.parafin.com/api-reference/capital-product-payments/create-capital-product-payment-sandbox*

---

## Get Capital Product

**POST** `/v1/capital_products/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get Capital ProductcURLcurl --request GET \
  --url https://api.parafin.com/v1/capital_products/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/capital_products/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "business_id": "<string>",
  "business_external_id": "<string>",
  "business_parafin_id": "<string>",
  "capital_product_offer_id": "<string>",
  "offer_id": "<string>",
  "accepted_amount": 123,
  "accepted_at": "2023-11-07T05:31:56Z",
  "fee_amount": 123,
  "fee_discount_amount": 123,
  "payment_plan": {
    "schedule": "daily",
    "plan_type": "sales_based",
    "term_days": 123,
    "rate": 123,
    "fixed_amount": 123,
    "term_length_months": 123
  },
  "fee_multiplier": 123,
  "outstanding_amount": 123,
  "state": "outstanding",
  "product_type": "merchant_cash_advance",
  "funded_at": "2023-11-07T05:31:56Z",
  "flex_loan_details": {
    "loan_health_status": "current",
    "overdue_amount": 123,
    "minimum_repayment_amount_due": 123,
    "next_minimum_repayment_due_date": "2023-12-25"
  },
  "term_loan_details": {
    "loan_health_status": "current",
    "overdue_amount": 123,
    "fixed_amount": 123,
    "next_fixed_repayment_due_date": "2023-12-25"
  },
  "bnpl_loan_details": {
    "loan_health_status": "current",
    "overdue_amount": 123,
    "fixed_amount": 123,
    "next_fixed_repayment_due_date": "2023-12-25"
  }
}
```

```json
{
  "id": "<string>",
  "business_id": "<string>",
  "business_external_id": "<string>",
  "business_parafin_id": "<string>",
  "capital_product_offer_id": "<string>",
  "offer_id": "<string>",
  "accepted_amount": 123,
  "accepted_at": "2023-11-07T05:31:56Z",
  "fee_amount": 123,
  "fee_discount_amount": 123,
  "payment_plan": {
    "schedule": "daily",
    "plan_type": "sales_based",
    "term_days": 123,
    "rate": 123,
    "fixed_amount": 123,
    "term_length_months": 123
  },
  "fee_multiplier": 123,
  "outstanding_amount": 123,
  "state": "outstanding",
  "product_type": "merchant_cash_advance",
  "funded_at": "2023-11-07T05:31:56Z",
  "flex_loan_details": {
    "loan_health_status": "current",
    "overdue_amount": 123,
    "minimum_repayment_amount_due": 123,
    "next_minimum_repayment_due_date": "2023-12-25"
  },
  "term_loan_details": {
    "loan_health_status": "current",
    "overdue_amount": 123,
    "fixed_amount": 123,
    "next_fixed_repayment_due_date": "2023-12-25"
  },
  "bnpl_loan_details": {
    "loan_health_status": "current",
    "overdue_amount": 123,
    "fixed_amount": 123,
    "next_fixed_repayment_due_date": "2023-12-25"
  }
}
```

*Source: https://docs.parafin.com/api-reference/capital-products/get-capital-product*

---

## Get Loan Minimum Repayment Details For A Capital Product

**POST** `/v1/capital_products/{id}/loan_minimum_repayment`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get Loan Minimum Repayment Details For A Capital ProductcURLcurl --request GET \
  --url https://api.parafin.com/v1/capital_products/{id}/loan_minimum_repayment \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/capital_products/{id}/loan_minimum_repayment \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "next_minimum_repayment_due_date": "2023-12-25",
  "is_overdue": true,
  "minimum_repayment_amount_due": 123,
  "overdue_amount": 123
}
```

```json
{
  "next_minimum_repayment_due_date": "2023-12-25",
  "is_overdue": true,
  "minimum_repayment_amount_due": 123,
  "overdue_amount": 123
}
```

*Source: https://docs.parafin.com/api-reference/capital-products/get-loan-minimum-repayment-details-for-a-capital-product*

---

## List Capital Products

**POST** `/v1/capital_products`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List Capital ProductscURLcurl --request GET \
  --url https://api.parafin.com/v1/capital_products \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/capital_products \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "business_external_id": "<string>",
      "business_parafin_id": "<string>",
      "capital_product_offer_id": "<string>",
      "offer_id": "<string>",
      "accepted_amount": 123,
      "accepted_at": "2023-11-07T05:31:56Z",
      "fee_amount": 123,
      "fee_discount_amount": 123,
      "payment_plan": {
        "schedule": "daily",
        "plan_type": "sales_based",
        "term_days": 123,
        "rate": 123,
        "fixed_amount": 123,
        "term_length_months": 123
      },
      "fee_multiplier": 123,
      "outstanding_amount": 123,
      "state": "outstanding",
      "product_type": "merchant_cash_advance",
      "funded_at": "2023-11-07T05:31:56Z",
      "flex_loan_details": {
        "loan_health_status": "current",
        "overdue_amount": 123,
        "minimum_repayment_amount_due": 123,
        "next_minimum_repayment_due_date": "2023-12-25"
      },
      "term_loan_details": {
        "loan_health_status": "current",
        "overdue_amount": 123,
        "fixed_amount": 123,
        "next_fixed_repayment_due_date": "2023-12-25"
      },
      "bnpl_loan_details": {
        "loan_health_status": "current",
        "overdue_amount": 123,
        "fixed_amount": 123,
        "next_fixed_repayment_due_date": "2023-12-25"
      }
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "business_external_id": "<string>",
      "business_parafin_id": "<string>",
      "capital_product_offer_id": "<string>",
      "offer_id": "<string>",
      "accepted_amount": 123,
      "accepted_at": "2023-11-07T05:31:56Z",
      "fee_amount": 123,
      "fee_discount_amount": 123,
      "payment_plan": {
        "schedule": "daily",
        "plan_type": "sales_based",
        "term_days": 123,
        "rate": 123,
        "fixed_amount": 123,
        "term_length_months": 123
      },
      "fee_multiplier": 123,
      "outstanding_amount": 123,
      "state": "outstanding",
      "product_type": "merchant_cash_advance",
      "funded_at": "2023-11-07T05:31:56Z",
      "flex_loan_details": {
        "loan_health_status": "current",
        "overdue_amount": 123,
        "minimum_repayment_amount_due": 123,
        "next_minimum_repayment_due_date": "2023-12-25"
      },
      "term_loan_details": {
        "loan_health_status": "current",
        "overdue_amount": 123,
        "fixed_amount": 123,
        "next_fixed_repayment_due_date": "2023-12-25"
      },
      "bnpl_loan_details": {
        "loan_health_status": "current",
        "overdue_amount": 123,
        "fixed_amount": 123,
        "next_fixed_repayment_due_date": "2023-12-25"
      }
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/capital-products/list-capital-products*

---

## Get Capital Product Grace Period Detail

**POST** `/v1/capital_products/{id}/grace_period_details`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get Capital Product Grace Period DetailcURLcurl --request GET \
  --url https://api.parafin.com/v1/capital_products/{id}/grace_period_details \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/capital_products/{id}/grace_period_details \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "capital_product_id": "<string>",
  "eligible": true,
  "as_of": "2023-11-07T05:31:56Z",
  "eligibility_details": {
    "grace_period_end_time": "2023-11-07T05:31:56Z",
    "payment_amount": 123,
    "fee_amount_waived": 123,
    "currency": "USD"
  }
}
```

```json
{
  "capital_product_id": "<string>",
  "eligible": true,
  "as_of": "2023-11-07T05:31:56Z",
  "eligibility_details": {
    "grace_period_end_time": "2023-11-07T05:31:56Z",
    "payment_amount": 123,
    "fee_amount_waived": 123,
    "currency": "USD"
  }
}
```

*Source: https://docs.parafin.com/api-reference/capital-product-grace-period-details/get-capital-product-grace-period-detail*

---

## List Capital Product Grace Period Details

**POST** `/v1/capital_products/grace_period_details`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List Capital Product Grace Period DetailscURLcurl --request GET \
  --url https://api.parafin.com/v1/capital_products/grace_period_details \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/capital_products/grace_period_details \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "capital_product_id": "<string>",
      "eligible": true,
      "as_of": "2023-11-07T05:31:56Z",
      "eligibility_details": {
        "grace_period_end_time": "2023-11-07T05:31:56Z",
        "payment_amount": 123,
        "fee_amount_waived": 123,
        "currency": "USD"
      }
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "capital_product_id": "<string>",
      "eligible": true,
      "as_of": "2023-11-07T05:31:56Z",
      "eligibility_details": {
        "grace_period_end_time": "2023-11-07T05:31:56Z",
        "payment_amount": 123,
        "fee_amount_waived": 123,
        "currency": "USD"
      }
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/capital-product-grace-period-details/list-capital-product-grace-period-details*

---

## List Credit Limits

**POST** `/v1/credit_limit`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List Credit LimitscURLcurl --request GET \
  --url https://api.parafin.com/v1/credit_limit \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/credit_limit \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_parafin_id": "<string>",
      "product_type": "bnpl",
      "amount": 123,
      "currency": "USD",
      "active": true,
      "created_at": "2023-11-07T05:31:56Z",
      "closed_at": "2023-11-07T05:31:56Z"
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_parafin_id": "<string>",
      "product_type": "bnpl",
      "amount": 123,
      "currency": "USD",
      "active": true,
      "created_at": "2023-11-07T05:31:56Z",
      "closed_at": "2023-11-07T05:31:56Z"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/credit-limits/list-credit-limits*

---

## Expire Credit Limit (Sandbox)

**POST** `/v1/sandbox/credit_limit/{id}/expire`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Expire Credit Limit (Sandbox)cURLcurl --request POST \
  --url https://api.parafin.com/v1/sandbox/credit_limit/{id}/expire \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/sandbox/credit_limit/{id}/expire \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "business_parafin_id": "<string>",
  "product_type": "bnpl",
  "amount": 123,
  "currency": "USD",
  "active": true,
  "created_at": "2023-11-07T05:31:56Z",
  "closed_at": "2023-11-07T05:31:56Z"
}
```

```json
{
  "id": "<string>",
  "business_parafin_id": "<string>",
  "product_type": "bnpl",
  "amount": 123,
  "currency": "USD",
  "active": true,
  "created_at": "2023-11-07T05:31:56Z",
  "closed_at": "2023-11-07T05:31:56Z"
}
```

*Source: https://docs.parafin.com/api-reference/credit-limits/expire-credit-limit-sandbox*

---

## Update Credit Limit (Sandbox)

**POST** `/v1/sandbox/credit_limit`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Update Credit Limit (Sandbox)cURLcurl --request POST \
  --url https://api.parafin.com/v1/sandbox/credit_limit \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "business_parafin_id": "<string>",
  "product_type": "bnpl",
  "amount": 123
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/sandbox/credit_limit \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "business_parafin_id": "<string>",
  "product_type": "bnpl",
  "amount": 123
}
'
```

```json
200400default{
  "id": "<string>",
  "business_parafin_id": "<string>",
  "product_type": "bnpl",
  "amount": 123,
  "currency": "USD",
  "active": true,
  "created_at": "2023-11-07T05:31:56Z",
  "closed_at": "2023-11-07T05:31:56Z"
}
```

```json
{
  "id": "<string>",
  "business_parafin_id": "<string>",
  "product_type": "bnpl",
  "amount": 123,
  "currency": "USD",
  "active": true,
  "created_at": "2023-11-07T05:31:56Z",
  "closed_at": "2023-11-07T05:31:56Z"
}
```

*Source: https://docs.parafin.com/api-reference/credit-limits/update-credit-limit-sandbox*

---

## Create multiple Daily Sales Records

**POST** `/v1/daily_sales_records/batch_create`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create multiple Daily Sales RecordscURLcurl --request POST \
  --url https://api.parafin.com/v1/daily_sales_records/batch_create \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requests": [
    {
      "date": "2023-12-25",
      "sales_amount": 123,
      "sales_count": 123,
      "reversals_amount": 123,
      "reversals_count": 123,
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "business_external_id": "<string>",
      "custom_data": {},
      "currency": "USD"
    }
  ]
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/daily_sales_records/batch_create \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requests": [
    {
      "date": "2023-12-25",
      "sales_amount": 123,
      "sales_count": 123,
      "reversals_amount": 123,
      "reversals_count": 123,
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "business_external_id": "<string>",
      "custom_data": {},
      "currency": "USD"
    }
  ]
}
'
```

```json
200400default{
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "date": "2023-12-25",
      "sales_amount": 123,
      "sales_count": 123,
      "currency": "USD",
      "reversals_amount": 123,
      "reversals_count": 123,
      "custom_data": {}
    }
  ]
}
```

```json
{
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "date": "2023-12-25",
      "sales_amount": 123,
      "sales_count": 123,
      "currency": "USD",
      "reversals_amount": 123,
      "reversals_count": 123,
      "custom_data": {}
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/daily-sales-records/create-multiple-daily-sales-records*

---

## Bulk ingest Daily Sale Record

**POST** `/v1/daily_sales_records/bulk_ingest`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Bulk ingest Daily Sale RecordcURLcurl --request POST \
  --url https://api.parafin.com/v1/daily_sales_records/bulk_ingest \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "handle_duplicates_behavior": "error",
  "requests": [
    {
      "date": "2023-12-25",
      "sales_amount": 123,
      "sales_count": 123,
      "reversals_amount": 123,
      "reversals_count": 123,
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "business_external_id": "<string>",
      "custom_data": {},
      "currency": "USD"
    }
  ]
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/daily_sales_records/bulk_ingest \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "handle_duplicates_behavior": "error",
  "requests": [
    {
      "date": "2023-12-25",
      "sales_amount": 123,
      "sales_count": 123,
      "reversals_amount": 123,
      "reversals_count": 123,
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "business_external_id": "<string>",
      "custom_data": {},
      "currency": "USD"
    }
  ]
}
'
```

```json
200400default{
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "date": "2023-12-25",
      "sales_amount": 123,
      "sales_count": 123,
      "currency": "USD",
      "reversals_amount": 123,
      "reversals_count": 123,
      "custom_data": {}
    }
  ]
}
```

```json
{
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "date": "2023-12-25",
      "sales_amount": 123,
      "sales_count": 123,
      "currency": "USD",
      "reversals_amount": 123,
      "reversals_count": 123,
      "custom_data": {}
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/daily-sales-records/bulk-ingest-daily-sale-record*

---

## List Daily Sales Records

**POST** `/v1/daily_sales_records`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List Daily Sales RecordscURLcurl --request GET \
  --url https://api.parafin.com/v1/daily_sales_records \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/daily_sales_records \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "date": "2023-12-25",
      "sales_amount": 123,
      "sales_count": 123,
      "currency": "USD",
      "reversals_amount": 123,
      "reversals_count": 123,
      "custom_data": {}
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "date": "2023-12-25",
      "sales_amount": 123,
      "sales_count": 123,
      "currency": "USD",
      "reversals_amount": 123,
      "reversals_count": 123,
      "custom_data": {}
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/daily-sales-records/list-daily-sales-records*

---

## Create Daily Sale Record

**POST** `/v1/daily_sales_records`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create Daily Sale RecordcURLcurl --request POST \
  --url https://api.parafin.com/v1/daily_sales_records \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "date": "2023-12-25",
  "sales_amount": 123,
  "sales_count": 123,
  "reversals_amount": 123,
  "reversals_count": 123,
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "custom_data": {},
  "currency": "USD"
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/daily_sales_records \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "date": "2023-12-25",
  "sales_amount": 123,
  "sales_count": 123,
  "reversals_amount": 123,
  "reversals_count": 123,
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "custom_data": {},
  "currency": "USD"
}
'
```

```json
200400default{
  "id": "<string>",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "date": "2023-12-25",
  "sales_amount": 123,
  "sales_count": 123,
  "currency": "USD",
  "reversals_amount": 123,
  "reversals_count": 123,
  "custom_data": {}
}
```

```json
{
  "id": "<string>",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "date": "2023-12-25",
  "sales_amount": 123,
  "sales_count": 123,
  "currency": "USD",
  "reversals_amount": 123,
  "reversals_count": 123,
  "custom_data": {}
}
```

*Source: https://docs.parafin.com/api-reference/daily-sales-records/create-daily-sale-record*

---

## Get Daily Sale Record

**POST** `/v1/daily_sales_records/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get Daily Sale RecordcURLcurl --request GET \
  --url https://api.parafin.com/v1/daily_sales_records/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/daily_sales_records/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "date": "2023-12-25",
  "sales_amount": 123,
  "sales_count": 123,
  "currency": "USD",
  "reversals_amount": 123,
  "reversals_count": 123,
  "custom_data": {}
}
```

```json
{
  "id": "<string>",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "date": "2023-12-25",
  "sales_amount": 123,
  "sales_count": 123,
  "currency": "USD",
  "reversals_amount": 123,
  "reversals_count": 123,
  "custom_data": {}
}
```

*Source: https://docs.parafin.com/api-reference/daily-sales-records/get-daily-sale-record*

---

## Update Daily Sale Record

**POST** `/v1/daily_sales_records/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Update Daily Sale RecordcURLcurl --request PATCH \
  --url https://api.parafin.com/v1/daily_sales_records/{id} \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "sales_amount": 123,
  "sales_count": 123,
  "reversals_amount": 123,
  "reversals_count": 123,
  "currency": "USD",
  "custom_data": {}
}
'
```

```bash
curl --request PATCH \
  --url https://api.parafin.com/v1/daily_sales_records/{id} \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "sales_amount": 123,
  "sales_count": 123,
  "reversals_amount": 123,
  "reversals_count": 123,
  "currency": "USD",
  "custom_data": {}
}
'
```

```json
200400default{
  "id": "<string>",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "date": "2023-12-25",
  "sales_amount": 123,
  "sales_count": 123,
  "currency": "USD",
  "reversals_amount": 123,
  "reversals_count": 123,
  "custom_data": {}
}
```

```json
{
  "id": "<string>",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "date": "2023-12-25",
  "sales_amount": 123,
  "sales_count": 123,
  "currency": "USD",
  "reversals_amount": 123,
  "reversals_count": 123,
  "custom_data": {}
}
```

*Source: https://docs.parafin.com/api-reference/daily-sales-records/update-daily-sale-record*

---

## [Experimental] Create dashboard link

**POST** `/v1/dashboard_links`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] Create dashboard linkcURLcurl --request POST \
  --url https://api.parafin.com/v1/dashboard_links \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "person_id": "<string>",
  "person_external_id": "<string>",
  "read_only": true
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/dashboard_links \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "person_id": "<string>",
  "person_external_id": "<string>",
  "read_only": true
}
'
```

```json
200400default{
  "url": "<string>"
}
```

```json
{
  "url": "<string>"
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-dashboard-links/[experimental]-create-dashboard-link*

---

## [Experimental] Get Eligibility

**POST** `/v1/eligibility`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] Get EligibilitycURLcurl --request GET \
  --url https://api.parafin.com/v1/eligibility \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/eligibility \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "business_id": "<string>",
  "flow": "line_of_credit_application",
  "as_of": "2023-11-07T05:31:56Z",
  "eligibility": "eligible"
}
```

```json
{
  "business_id": "<string>",
  "flow": "line_of_credit_application",
  "as_of": "2023-11-07T05:31:56Z",
  "eligibility": "eligible"
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-eligibility/[experimental]-get-eligibility*

---

## Get Line of Credit

**POST** `/v1/line_of_credit/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get Line of CreditcURLcurl --request GET \
  --url https://api.parafin.com/v1/line_of_credit/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/line_of_credit/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "business_parafin_id": "<string>",
  "status": "active",
  "accepted_at": "2023-11-07T05:31:56Z",
  "total_amount": 123,
  "spending_power": 123,
  "product_type": "bnpl",
  "currency": "USD",
  "closed_at": "2023-11-07T05:31:56Z"
}
```

```json
{
  "id": "<string>",
  "business_parafin_id": "<string>",
  "status": "active",
  "accepted_at": "2023-11-07T05:31:56Z",
  "total_amount": 123,
  "spending_power": 123,
  "product_type": "bnpl",
  "currency": "USD",
  "closed_at": "2023-11-07T05:31:56Z"
}
```

*Source: https://docs.parafin.com/api-reference/lines-of-credit/get-line-of-credit*

---

## List Lines of credit

**POST** `/v1/line_of_credit`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List Lines of creditcURLcurl --request GET \
  --url https://api.parafin.com/v1/line_of_credit \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/line_of_credit \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_parafin_id": "<string>",
      "status": "active",
      "accepted_at": "2023-11-07T05:31:56Z",
      "total_amount": 123,
      "spending_power": 123,
      "product_type": "bnpl",
      "currency": "USD",
      "closed_at": "2023-11-07T05:31:56Z"
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_parafin_id": "<string>",
      "status": "active",
      "accepted_at": "2023-11-07T05:31:56Z",
      "total_amount": 123,
      "spending_power": 123,
      "product_type": "bnpl",
      "currency": "USD",
      "closed_at": "2023-11-07T05:31:56Z"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/lines-of-credit/list-lines-of-credit*

---

## [Experimental] Approve Line of Credit Application

**POST** `/v1/sandbox/line_of_credit_application/{id}/approve`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] Approve Line of Credit ApplicationcURLcurl --request POST \
  --url https://api.parafin.com/v1/sandbox/line_of_credit_application/{id}/approve \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/sandbox/line_of_credit_application/{id}/approve \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "success": true,
  "application": {
    "id": "<string>",
    "status": "opened",
    "business_parafin_id": "<string>",
    "business_external_id": "<string>",
    "partner_id": "<string>",
    "opened_at": "2023-11-07T05:31:56Z",
    "parafin_redirect_url": "<string>",
    "accepted_at": "2023-11-07T05:31:56Z",
    "submitted_at": "2023-11-07T05:31:56Z",
    "declined_at": "2023-11-07T05:31:56Z",
    "canceled_at": "2023-11-07T05:31:56Z",
    "accept_redirect_url": "<string>",
    "cancel_redirect_url": "<string>"
  }
}
```

```json
{
  "success": true,
  "application": {
    "id": "<string>",
    "status": "opened",
    "business_parafin_id": "<string>",
    "business_external_id": "<string>",
    "partner_id": "<string>",
    "opened_at": "2023-11-07T05:31:56Z",
    "parafin_redirect_url": "<string>",
    "accepted_at": "2023-11-07T05:31:56Z",
    "submitted_at": "2023-11-07T05:31:56Z",
    "declined_at": "2023-11-07T05:31:56Z",
    "canceled_at": "2023-11-07T05:31:56Z",
    "accept_redirect_url": "<string>",
    "cancel_redirect_url": "<string>"
  }
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-line-of-credit-applications/[experimental]-approve-line-of-credit-application*

---

## [Experimental] Cancel Line of Credit Application

**POST** `/v1/sandbox/line_of_credit_application/{id}/cancel`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] Cancel Line of Credit ApplicationcURLcurl --request POST \
  --url https://api.parafin.com/v1/sandbox/line_of_credit_application/{id}/cancel \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/sandbox/line_of_credit_application/{id}/cancel \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "success": true,
  "application": {
    "id": "<string>",
    "status": "opened",
    "business_parafin_id": "<string>",
    "business_external_id": "<string>",
    "partner_id": "<string>",
    "opened_at": "2023-11-07T05:31:56Z",
    "parafin_redirect_url": "<string>",
    "accepted_at": "2023-11-07T05:31:56Z",
    "submitted_at": "2023-11-07T05:31:56Z",
    "declined_at": "2023-11-07T05:31:56Z",
    "canceled_at": "2023-11-07T05:31:56Z",
    "accept_redirect_url": "<string>",
    "cancel_redirect_url": "<string>"
  }
}
```

```json
{
  "success": true,
  "application": {
    "id": "<string>",
    "status": "opened",
    "business_parafin_id": "<string>",
    "business_external_id": "<string>",
    "partner_id": "<string>",
    "opened_at": "2023-11-07T05:31:56Z",
    "parafin_redirect_url": "<string>",
    "accepted_at": "2023-11-07T05:31:56Z",
    "submitted_at": "2023-11-07T05:31:56Z",
    "declined_at": "2023-11-07T05:31:56Z",
    "canceled_at": "2023-11-07T05:31:56Z",
    "accept_redirect_url": "<string>",
    "cancel_redirect_url": "<string>"
  }
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-line-of-credit-applications/[experimental]-cancel-line-of-credit-application*

---

## [Experimental] Create Line of Credit Application

**POST** `/v1/line_of_credit_application`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] Create Line of Credit ApplicationcURLcurl --request POST \
  --url https://api.parafin.com/v1/line_of_credit_application \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "business_parafin_id": "<string>",
  "accept_redirect_url": "<string>",
  "cancel_redirect_url": "<string>"
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/line_of_credit_application \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "business_parafin_id": "<string>",
  "accept_redirect_url": "<string>",
  "cancel_redirect_url": "<string>"
}
'
```

```json
200400default{
  "id": "<string>",
  "status": "opened",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "partner_id": "<string>",
  "opened_at": "2023-11-07T05:31:56Z",
  "parafin_redirect_url": "<string>",
  "accepted_at": "2023-11-07T05:31:56Z",
  "submitted_at": "2023-11-07T05:31:56Z",
  "declined_at": "2023-11-07T05:31:56Z",
  "canceled_at": "2023-11-07T05:31:56Z",
  "accept_redirect_url": "<string>",
  "cancel_redirect_url": "<string>"
}
```

```json
{
  "id": "<string>",
  "status": "opened",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "partner_id": "<string>",
  "opened_at": "2023-11-07T05:31:56Z",
  "parafin_redirect_url": "<string>",
  "accepted_at": "2023-11-07T05:31:56Z",
  "submitted_at": "2023-11-07T05:31:56Z",
  "declined_at": "2023-11-07T05:31:56Z",
  "canceled_at": "2023-11-07T05:31:56Z",
  "accept_redirect_url": "<string>",
  "cancel_redirect_url": "<string>"
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-line-of-credit-applications/[experimental]-create-line-of-credit-application*

---

## [Experimental] Deny Line of Credit Application

**POST** `/v1/sandbox/line_of_credit_application/{id}/deny`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] Deny Line of Credit ApplicationcURLcurl --request POST \
  --url https://api.parafin.com/v1/sandbox/line_of_credit_application/{id}/deny \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/sandbox/line_of_credit_application/{id}/deny \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "success": true,
  "application": {
    "id": "<string>",
    "status": "opened",
    "business_parafin_id": "<string>",
    "business_external_id": "<string>",
    "partner_id": "<string>",
    "opened_at": "2023-11-07T05:31:56Z",
    "parafin_redirect_url": "<string>",
    "accepted_at": "2023-11-07T05:31:56Z",
    "submitted_at": "2023-11-07T05:31:56Z",
    "declined_at": "2023-11-07T05:31:56Z",
    "canceled_at": "2023-11-07T05:31:56Z",
    "accept_redirect_url": "<string>",
    "cancel_redirect_url": "<string>"
  }
}
```

```json
{
  "success": true,
  "application": {
    "id": "<string>",
    "status": "opened",
    "business_parafin_id": "<string>",
    "business_external_id": "<string>",
    "partner_id": "<string>",
    "opened_at": "2023-11-07T05:31:56Z",
    "parafin_redirect_url": "<string>",
    "accepted_at": "2023-11-07T05:31:56Z",
    "submitted_at": "2023-11-07T05:31:56Z",
    "declined_at": "2023-11-07T05:31:56Z",
    "canceled_at": "2023-11-07T05:31:56Z",
    "accept_redirect_url": "<string>",
    "cancel_redirect_url": "<string>"
  }
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-line-of-credit-applications/[experimental]-deny-line-of-credit-application*

---

## List Line of Credit Applications

**POST** `/v1/line_of_credit_application`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List Line of Credit ApplicationscURLcurl --request GET \
  --url https://api.parafin.com/v1/line_of_credit_application \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/line_of_credit_application \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "status": "opened",
      "business_parafin_id": "<string>",
      "business_external_id": "<string>",
      "partner_id": "<string>",
      "opened_at": "2023-11-07T05:31:56Z",
      "parafin_redirect_url": "<string>",
      "accepted_at": "2023-11-07T05:31:56Z",
      "submitted_at": "2023-11-07T05:31:56Z",
      "declined_at": "2023-11-07T05:31:56Z",
      "canceled_at": "2023-11-07T05:31:56Z",
      "accept_redirect_url": "<string>",
      "cancel_redirect_url": "<string>"
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "status": "opened",
      "business_parafin_id": "<string>",
      "business_external_id": "<string>",
      "partner_id": "<string>",
      "opened_at": "2023-11-07T05:31:56Z",
      "parafin_redirect_url": "<string>",
      "accepted_at": "2023-11-07T05:31:56Z",
      "submitted_at": "2023-11-07T05:31:56Z",
      "declined_at": "2023-11-07T05:31:56Z",
      "canceled_at": "2023-11-07T05:31:56Z",
      "accept_redirect_url": "<string>",
      "cancel_redirect_url": "<string>"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/line-of-credit-applications/list-line-of-credit-applications*

---

## Get Line of Credit Application

**POST** `/v1/line_of_credit_application/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get Line of Credit ApplicationcURLcurl --request GET \
  --url https://api.parafin.com/v1/line_of_credit_application/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/line_of_credit_application/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "status": "opened",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "partner_id": "<string>",
  "opened_at": "2023-11-07T05:31:56Z",
  "parafin_redirect_url": "<string>",
  "accepted_at": "2023-11-07T05:31:56Z",
  "submitted_at": "2023-11-07T05:31:56Z",
  "declined_at": "2023-11-07T05:31:56Z",
  "canceled_at": "2023-11-07T05:31:56Z",
  "accept_redirect_url": "<string>",
  "cancel_redirect_url": "<string>"
}
```

```json
{
  "id": "<string>",
  "status": "opened",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "partner_id": "<string>",
  "opened_at": "2023-11-07T05:31:56Z",
  "parafin_redirect_url": "<string>",
  "accepted_at": "2023-11-07T05:31:56Z",
  "submitted_at": "2023-11-07T05:31:56Z",
  "declined_at": "2023-11-07T05:31:56Z",
  "canceled_at": "2023-11-07T05:31:56Z",
  "accept_redirect_url": "<string>",
  "cancel_redirect_url": "<string>"
}
```

*Source: https://docs.parafin.com/api-reference/line-of-credit-applications/get-line-of-credit-application*

---

## [Experimental] Cancel Net Settlement Payment Fulfillment

**POST** `/v1/net_settlement_payment_requests/{id}/cancel_fulfillment`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] Cancel Net Settlement Payment FulfillmentcURLcurl --request PATCH \
  --url https://api.parafin.com/v1/net_settlement_payment_requests/{id}/cancel_fulfillment \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "cancel_reason": "insufficient_funds"
}
'
```

```bash
curl --request PATCH \
  --url https://api.parafin.com/v1/net_settlement_payment_requests/{id}/cancel_fulfillment \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "cancel_reason": "insufficient_funds"
}
'
```

```json
200400default{
  "net_settlement_payment_request": {
    "id": "<string>",
    "business_external_id": "<string>",
    "business_parafin_id": "<string>",
    "sales_period": {
      "start_date": "2023-12-25",
      "end_date": "2023-12-25"
    },
    "requested_amount": {
      "value": 123,
      "currency": "AED"
    },
    "status": "created",
    "created_at": "2023-11-07T05:31:56Z",
    "fulfilled_amount": {
      "value": 123,
      "currency": "AED"
    },
    "transaction_id": "<string>",
    "fulfillment_ach_identifier": "<string>",
    "acknowledged_at": "2023-11-07T05:31:56Z",
    "fulfilled_at": "2023-11-07T05:31:56Z",
    "initiated_at": "2023-11-07T05:31:56Z",
    "reconciled_at": "2023-11-07T05:31:56Z",
    "declined_at": "2023-11-07T05:31:56Z",
    "cancelled_at": "2023-11-07T05:31:56Z",
    "shortfall_reason": "insufficient_funds"
  }
}
```

```json
{
  "net_settlement_payment_request": {
    "id": "<string>",
    "business_external_id": "<string>",
    "business_parafin_id": "<string>",
    "sales_period": {
      "start_date": "2023-12-25",
      "end_date": "2023-12-25"
    },
    "requested_amount": {
      "value": 123,
      "currency": "AED"
    },
    "status": "created",
    "created_at": "2023-11-07T05:31:56Z",
    "fulfilled_amount": {
      "value": 123,
      "currency": "AED"
    },
    "transaction_id": "<string>",
    "fulfillment_ach_identifier": "<string>",
    "acknowledged_at": "2023-11-07T05:31:56Z",
    "fulfilled_at": "2023-11-07T05:31:56Z",
    "initiated_at": "2023-11-07T05:31:56Z",
    "reconciled_at": "2023-11-07T05:31:56Z",
    "declined_at": "2023-11-07T05:31:56Z",
    "cancelled_at": "2023-11-07T05:31:56Z",
    "shortfall_reason": "insufficient_funds"
  }
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-net-settlement-payment-requests/[experimental]-cancel-net-settlement-payment-fulfillment*

---

## [Experimental] Decline Net Settlement Payment Fulfillment

**POST** `/v1/net_settlement_payment_requests/{id}/decline_fulfillment`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] Decline Net Settlement Payment FulfillmentcURLcurl --request PATCH \
  --url https://api.parafin.com/v1/net_settlement_payment_requests/{id}/decline_fulfillment \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "decline_reason": "insufficient_funds"
}
'
```

```bash
curl --request PATCH \
  --url https://api.parafin.com/v1/net_settlement_payment_requests/{id}/decline_fulfillment \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "decline_reason": "insufficient_funds"
}
'
```

```json
200400default{
  "net_settlement_payment_request": {
    "id": "<string>",
    "business_external_id": "<string>",
    "business_parafin_id": "<string>",
    "sales_period": {
      "start_date": "2023-12-25",
      "end_date": "2023-12-25"
    },
    "requested_amount": {
      "value": 123,
      "currency": "AED"
    },
    "status": "created",
    "created_at": "2023-11-07T05:31:56Z",
    "fulfilled_amount": {
      "value": 123,
      "currency": "AED"
    },
    "transaction_id": "<string>",
    "fulfillment_ach_identifier": "<string>",
    "acknowledged_at": "2023-11-07T05:31:56Z",
    "fulfilled_at": "2023-11-07T05:31:56Z",
    "initiated_at": "2023-11-07T05:31:56Z",
    "reconciled_at": "2023-11-07T05:31:56Z",
    "declined_at": "2023-11-07T05:31:56Z",
    "cancelled_at": "2023-11-07T05:31:56Z",
    "shortfall_reason": "insufficient_funds"
  }
}
```

```json
{
  "net_settlement_payment_request": {
    "id": "<string>",
    "business_external_id": "<string>",
    "business_parafin_id": "<string>",
    "sales_period": {
      "start_date": "2023-12-25",
      "end_date": "2023-12-25"
    },
    "requested_amount": {
      "value": 123,
      "currency": "AED"
    },
    "status": "created",
    "created_at": "2023-11-07T05:31:56Z",
    "fulfilled_amount": {
      "value": 123,
      "currency": "AED"
    },
    "transaction_id": "<string>",
    "fulfillment_ach_identifier": "<string>",
    "acknowledged_at": "2023-11-07T05:31:56Z",
    "fulfilled_at": "2023-11-07T05:31:56Z",
    "initiated_at": "2023-11-07T05:31:56Z",
    "reconciled_at": "2023-11-07T05:31:56Z",
    "declined_at": "2023-11-07T05:31:56Z",
    "cancelled_at": "2023-11-07T05:31:56Z",
    "shortfall_reason": "insufficient_funds"
  }
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-net-settlement-payment-requests/[experimental]-decline-net-settlement-payment-fulfillment*

---

## Create Net Settlement Payment Request

**POST** `/v1/sandbox/net_settlement_payment_requests`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create Net Settlement Payment RequestcURLcurl --request POST \
  --url https://api.parafin.com/v1/sandbox/net_settlement_payment_requests \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requested_amount": 123,
  "sales_period_start_date": "2023-12-25",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "sales_period_end_date": "2023-12-25"
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/sandbox/net_settlement_payment_requests \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requested_amount": 123,
  "sales_period_start_date": "2023-12-25",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "sales_period_end_date": "2023-12-25"
}
'
```

```json
200400default{
  "net_settlement_payment_request": {
    "id": "<string>",
    "business_external_id": "<string>",
    "business_parafin_id": "<string>",
    "sales_period": {
      "start_date": "2023-12-25",
      "end_date": "2023-12-25"
    },
    "requested_amount": {
      "value": 123,
      "currency": "AED"
    },
    "status": "created",
    "created_at": "2023-11-07T05:31:56Z",
    "fulfilled_amount": {
      "value": 123,
      "currency": "AED"
    },
    "transaction_id": "<string>",
    "fulfillment_ach_identifier": "<string>",
    "acknowledged_at": "2023-11-07T05:31:56Z",
    "fulfilled_at": "2023-11-07T05:31:56Z",
    "initiated_at": "2023-11-07T05:31:56Z",
    "reconciled_at": "2023-11-07T05:31:56Z",
    "declined_at": "2023-11-07T05:31:56Z",
    "cancelled_at": "2023-11-07T05:31:56Z",
    "shortfall_reason": "insufficient_funds"
  }
}
```

```json
{
  "net_settlement_payment_request": {
    "id": "<string>",
    "business_external_id": "<string>",
    "business_parafin_id": "<string>",
    "sales_period": {
      "start_date": "2023-12-25",
      "end_date": "2023-12-25"
    },
    "requested_amount": {
      "value": 123,
      "currency": "AED"
    },
    "status": "created",
    "created_at": "2023-11-07T05:31:56Z",
    "fulfilled_amount": {
      "value": 123,
      "currency": "AED"
    },
    "transaction_id": "<string>",
    "fulfillment_ach_identifier": "<string>",
    "acknowledged_at": "2023-11-07T05:31:56Z",
    "fulfilled_at": "2023-11-07T05:31:56Z",
    "initiated_at": "2023-11-07T05:31:56Z",
    "reconciled_at": "2023-11-07T05:31:56Z",
    "declined_at": "2023-11-07T05:31:56Z",
    "cancelled_at": "2023-11-07T05:31:56Z",
    "shortfall_reason": "insufficient_funds"
  }
}
```

*Source: https://docs.parafin.com/api-reference/net-settlement-payment-requests/create-net-settlement-payment-request*

---

## Fulfill Net Settlement Payment Request

**POST** `/v1/net_settlement_payment_requests/{id}/fulfill`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Fulfill Net Settlement Payment RequestcURLcurl --request PATCH \
  --url https://api.parafin.com/v1/net_settlement_payment_requests/{id}/fulfill \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "fulfilled_amount": {
    "value": 123,
    "currency": "AED"
  },
  "transaction_id": "<string>",
  "partial_fulfill_reason": "insufficient_funds"
}
'
```

```bash
curl --request PATCH \
  --url https://api.parafin.com/v1/net_settlement_payment_requests/{id}/fulfill \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "fulfilled_amount": {
    "value": 123,
    "currency": "AED"
  },
  "transaction_id": "<string>",
  "partial_fulfill_reason": "insufficient_funds"
}
'
```

```json
200400default{
  "net_settlement_payment_request": {
    "id": "<string>",
    "business_external_id": "<string>",
    "business_parafin_id": "<string>",
    "sales_period": {
      "start_date": "2023-12-25",
      "end_date": "2023-12-25"
    },
    "requested_amount": {
      "value": 123,
      "currency": "AED"
    },
    "status": "created",
    "created_at": "2023-11-07T05:31:56Z",
    "fulfilled_amount": {
      "value": 123,
      "currency": "AED"
    },
    "transaction_id": "<string>",
    "fulfillment_ach_identifier": "<string>",
    "acknowledged_at": "2023-11-07T05:31:56Z",
    "fulfilled_at": "2023-11-07T05:31:56Z",
    "initiated_at": "2023-11-07T05:31:56Z",
    "reconciled_at": "2023-11-07T05:31:56Z",
    "declined_at": "2023-11-07T05:31:56Z",
    "cancelled_at": "2023-11-07T05:31:56Z",
    "shortfall_reason": "insufficient_funds"
  }
}
```

```json
{
  "net_settlement_payment_request": {
    "id": "<string>",
    "business_external_id": "<string>",
    "business_parafin_id": "<string>",
    "sales_period": {
      "start_date": "2023-12-25",
      "end_date": "2023-12-25"
    },
    "requested_amount": {
      "value": 123,
      "currency": "AED"
    },
    "status": "created",
    "created_at": "2023-11-07T05:31:56Z",
    "fulfilled_amount": {
      "value": 123,
      "currency": "AED"
    },
    "transaction_id": "<string>",
    "fulfillment_ach_identifier": "<string>",
    "acknowledged_at": "2023-11-07T05:31:56Z",
    "fulfilled_at": "2023-11-07T05:31:56Z",
    "initiated_at": "2023-11-07T05:31:56Z",
    "reconciled_at": "2023-11-07T05:31:56Z",
    "declined_at": "2023-11-07T05:31:56Z",
    "cancelled_at": "2023-11-07T05:31:56Z",
    "shortfall_reason": "insufficient_funds"
  }
}
```

*Source: https://docs.parafin.com/api-reference/net-settlement-payment-requests/fulfill-net-settlement-payment-request*

---

## Get Net Settlement Payment Request

**POST** `/v1/net_settlement_payment_requests/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get Net Settlement Payment RequestcURLcurl --request GET \
  --url https://api.parafin.com/v1/net_settlement_payment_requests/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/net_settlement_payment_requests/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "net_settlement_payment_request": {
    "id": "<string>",
    "business_external_id": "<string>",
    "business_parafin_id": "<string>",
    "sales_period": {
      "start_date": "2023-12-25",
      "end_date": "2023-12-25"
    },
    "requested_amount": {
      "value": 123,
      "currency": "AED"
    },
    "status": "created",
    "created_at": "2023-11-07T05:31:56Z",
    "fulfilled_amount": {
      "value": 123,
      "currency": "AED"
    },
    "transaction_id": "<string>",
    "fulfillment_ach_identifier": "<string>",
    "acknowledged_at": "2023-11-07T05:31:56Z",
    "fulfilled_at": "2023-11-07T05:31:56Z",
    "initiated_at": "2023-11-07T05:31:56Z",
    "reconciled_at": "2023-11-07T05:31:56Z",
    "declined_at": "2023-11-07T05:31:56Z",
    "cancelled_at": "2023-11-07T05:31:56Z",
    "shortfall_reason": "insufficient_funds"
  }
}
```

```json
{
  "net_settlement_payment_request": {
    "id": "<string>",
    "business_external_id": "<string>",
    "business_parafin_id": "<string>",
    "sales_period": {
      "start_date": "2023-12-25",
      "end_date": "2023-12-25"
    },
    "requested_amount": {
      "value": 123,
      "currency": "AED"
    },
    "status": "created",
    "created_at": "2023-11-07T05:31:56Z",
    "fulfilled_amount": {
      "value": 123,
      "currency": "AED"
    },
    "transaction_id": "<string>",
    "fulfillment_ach_identifier": "<string>",
    "acknowledged_at": "2023-11-07T05:31:56Z",
    "fulfilled_at": "2023-11-07T05:31:56Z",
    "initiated_at": "2023-11-07T05:31:56Z",
    "reconciled_at": "2023-11-07T05:31:56Z",
    "declined_at": "2023-11-07T05:31:56Z",
    "cancelled_at": "2023-11-07T05:31:56Z",
    "shortfall_reason": "insufficient_funds"
  }
}
```

*Source: https://docs.parafin.com/api-reference/net-settlement-payment-requests/get-net-settlement-payment-request*

---

## Initiate Net Settlement Payment Request

**POST** `/v1/net_settlement_payment_requests/initiate`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Initiate Net Settlement Payment RequestcURLcurl --request PATCH \
  --url https://api.parafin.com/v1/net_settlement_payment_requests/initiate \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "fulfillment_ach_identifier": "<string>",
  "id": "<string>",
  "transaction_id": "<string>",
  "fulfilled_amount": {
    "value": 123,
    "currency": "AED"
  }
}
'
```

```bash
curl --request PATCH \
  --url https://api.parafin.com/v1/net_settlement_payment_requests/initiate \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "fulfillment_ach_identifier": "<string>",
  "id": "<string>",
  "transaction_id": "<string>",
  "fulfilled_amount": {
    "value": 123,
    "currency": "AED"
  }
}
'
```

```json
200400default{
  "net_settlement_payment_request": {
    "id": "<string>",
    "business_external_id": "<string>",
    "business_parafin_id": "<string>",
    "sales_period": {
      "start_date": "2023-12-25",
      "end_date": "2023-12-25"
    },
    "requested_amount": {
      "value": 123,
      "currency": "AED"
    },
    "status": "created",
    "created_at": "2023-11-07T05:31:56Z",
    "fulfilled_amount": {
      "value": 123,
      "currency": "AED"
    },
    "transaction_id": "<string>",
    "fulfillment_ach_identifier": "<string>",
    "acknowledged_at": "2023-11-07T05:31:56Z",
    "fulfilled_at": "2023-11-07T05:31:56Z",
    "initiated_at": "2023-11-07T05:31:56Z",
    "reconciled_at": "2023-11-07T05:31:56Z",
    "declined_at": "2023-11-07T05:31:56Z",
    "cancelled_at": "2023-11-07T05:31:56Z",
    "shortfall_reason": "insufficient_funds"
  }
}
```

```json
{
  "net_settlement_payment_request": {
    "id": "<string>",
    "business_external_id": "<string>",
    "business_parafin_id": "<string>",
    "sales_period": {
      "start_date": "2023-12-25",
      "end_date": "2023-12-25"
    },
    "requested_amount": {
      "value": 123,
      "currency": "AED"
    },
    "status": "created",
    "created_at": "2023-11-07T05:31:56Z",
    "fulfilled_amount": {
      "value": 123,
      "currency": "AED"
    },
    "transaction_id": "<string>",
    "fulfillment_ach_identifier": "<string>",
    "acknowledged_at": "2023-11-07T05:31:56Z",
    "fulfilled_at": "2023-11-07T05:31:56Z",
    "initiated_at": "2023-11-07T05:31:56Z",
    "reconciled_at": "2023-11-07T05:31:56Z",
    "declined_at": "2023-11-07T05:31:56Z",
    "cancelled_at": "2023-11-07T05:31:56Z",
    "shortfall_reason": "insufficient_funds"
  }
}
```

*Source: https://docs.parafin.com/api-reference/net-settlement-payment-requests/initiate-net-settlement-payment-request*

---

## List Net Settlement Payment Requests

**POST** `/v1/net_settlement_payment_requests`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List Net Settlement Payment RequestscURLcurl --request GET \
  --url https://api.parafin.com/v1/net_settlement_payment_requests \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/net_settlement_payment_requests \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_external_id": "<string>",
      "business_parafin_id": "<string>",
      "sales_period": {
        "start_date": "2023-12-25",
        "end_date": "2023-12-25"
      },
      "requested_amount": {
        "value": 123,
        "currency": "AED"
      },
      "status": "created",
      "created_at": "2023-11-07T05:31:56Z",
      "fulfilled_amount": {
        "value": 123,
        "currency": "AED"
      },
      "transaction_id": "<string>",
      "fulfillment_ach_identifier": "<string>",
      "acknowledged_at": "2023-11-07T05:31:56Z",
      "fulfilled_at": "2023-11-07T05:31:56Z",
      "initiated_at": "2023-11-07T05:31:56Z",
      "reconciled_at": "2023-11-07T05:31:56Z",
      "declined_at": "2023-11-07T05:31:56Z",
      "cancelled_at": "2023-11-07T05:31:56Z",
      "shortfall_reason": "insufficient_funds"
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_external_id": "<string>",
      "business_parafin_id": "<string>",
      "sales_period": {
        "start_date": "2023-12-25",
        "end_date": "2023-12-25"
      },
      "requested_amount": {
        "value": 123,
        "currency": "AED"
      },
      "status": "created",
      "created_at": "2023-11-07T05:31:56Z",
      "fulfilled_amount": {
        "value": 123,
        "currency": "AED"
      },
      "transaction_id": "<string>",
      "fulfillment_ach_identifier": "<string>",
      "acknowledged_at": "2023-11-07T05:31:56Z",
      "fulfilled_at": "2023-11-07T05:31:56Z",
      "initiated_at": "2023-11-07T05:31:56Z",
      "reconciled_at": "2023-11-07T05:31:56Z",
      "declined_at": "2023-11-07T05:31:56Z",
      "cancelled_at": "2023-11-07T05:31:56Z",
      "shortfall_reason": "insufficient_funds"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/net-settlement-payment-requests/list-net-settlement-payment-requests*

---

## [Experimental] Cancel Payment Fulfillment

**POST** `/v1/net_settlements/payment_fulfillments/{id}/cancellation`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] Cancel Payment FulfillmentcURLcurl --request POST \
  --url https://api.parafin.com/v1/net_settlements/payment_fulfillments/{id}/cancellation \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "request_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "cancel_reason": "insufficient_funds"
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/net_settlements/payment_fulfillments/{id}/cancellation \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "request_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "cancel_reason": "insufficient_funds"
}
'
```

```json
200400default{
  "id": "<string>",
  "status": "created",
  "error": "<string>",
  "fulfillment_detail": {
    "id": "<string>",
    "business_parafin_id": "<string>",
    "capital_product_id": "<string>",
    "sales_period": {
      "start_datetime_inclusive": "2023-11-07T05:31:56Z",
      "end_datetime_exclusive": "2023-11-07T05:31:56Z"
    },
    "target_collection_amount": 123,
    "actual_collection_amount": 123,
    "currency": "AED",
    "status": "created",
    "created_at": "2023-11-07T05:31:56Z",
    "updated_at": "2023-11-07T05:31:56Z",
    "business_external_id": "<string>",
    "shortfall_reason": "insufficient_funds",
    "transaction_external_id": "<string>",
    "fulfillment_ach_identifier": "<string>"
  }
}
```

```json
{
  "id": "<string>",
  "status": "created",
  "error": "<string>",
  "fulfillment_detail": {
    "id": "<string>",
    "business_parafin_id": "<string>",
    "capital_product_id": "<string>",
    "sales_period": {
      "start_datetime_inclusive": "2023-11-07T05:31:56Z",
      "end_datetime_exclusive": "2023-11-07T05:31:56Z"
    },
    "target_collection_amount": 123,
    "actual_collection_amount": 123,
    "currency": "AED",
    "status": "created",
    "created_at": "2023-11-07T05:31:56Z",
    "updated_at": "2023-11-07T05:31:56Z",
    "business_external_id": "<string>",
    "shortfall_reason": "insufficient_funds",
    "transaction_external_id": "<string>",
    "fulfillment_ach_identifier": "<string>"
  }
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-net-settlements-partner-calculation-based/[experimental]-cancel-payment-fulfillment*

---

## [Experimental] List net settlement payment fulfillments

**POST** `/v1/net_settlements/payment_fulfillments`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] List net settlement payment fulfillmentscURLcurl --request GET \
  --url https://api.parafin.com/v1/net_settlements/payment_fulfillments \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/net_settlements/payment_fulfillments \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_parafin_id": "<string>",
      "capital_product_id": "<string>",
      "sales_period": {
        "start_datetime_inclusive": "2023-11-07T05:31:56Z",
        "end_datetime_exclusive": "2023-11-07T05:31:56Z"
      },
      "target_collection_amount": 123,
      "actual_collection_amount": 123,
      "currency": "AED",
      "status": "created",
      "created_at": "2023-11-07T05:31:56Z",
      "updated_at": "2023-11-07T05:31:56Z",
      "business_external_id": "<string>",
      "shortfall_reason": "insufficient_funds",
      "transaction_external_id": "<string>",
      "fulfillment_ach_identifier": "<string>"
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_parafin_id": "<string>",
      "capital_product_id": "<string>",
      "sales_period": {
        "start_datetime_inclusive": "2023-11-07T05:31:56Z",
        "end_datetime_exclusive": "2023-11-07T05:31:56Z"
      },
      "target_collection_amount": 123,
      "actual_collection_amount": 123,
      "currency": "AED",
      "status": "created",
      "created_at": "2023-11-07T05:31:56Z",
      "updated_at": "2023-11-07T05:31:56Z",
      "business_external_id": "<string>",
      "shortfall_reason": "insufficient_funds",
      "transaction_external_id": "<string>",
      "fulfillment_ach_identifier": "<string>"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-net-settlements-partner-calculation-based/[experimental]-list-net-settlement-payment-fulfillments*

---

## [Experimental] Create net settlement payment fulfillment

**POST** `/v1/net_settlements/payment_fulfillments`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] Create net settlement payment fulfillmentcURLcurl --request POST \
  --url https://api.parafin.com/v1/net_settlements/payment_fulfillments \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "request_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "capital_product_id": "<string>",
  "net_settlement_collection_config_id": "<string>",
  "sales_period": {
    "start_datetime_inclusive": "2023-11-07T05:31:56Z",
    "end_datetime_exclusive": "2023-11-07T05:31:56Z"
  },
  "gross_sales_amount": 123,
  "reversal_amount": 123,
  "target_collection_amount": 123,
  "actual_collection_amount": 123,
  "currency": "AED",
  "withheld_at": "2023-11-07T05:31:56Z",
  "shortfall_reason": "insufficient_funds",
  "transaction_external_id": "<string>",
  "fulfillment_ach_identifier": "<string>"
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/net_settlements/payment_fulfillments \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "request_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "capital_product_id": "<string>",
  "net_settlement_collection_config_id": "<string>",
  "sales_period": {
    "start_datetime_inclusive": "2023-11-07T05:31:56Z",
    "end_datetime_exclusive": "2023-11-07T05:31:56Z"
  },
  "gross_sales_amount": 123,
  "reversal_amount": 123,
  "target_collection_amount": 123,
  "actual_collection_amount": 123,
  "currency": "AED",
  "withheld_at": "2023-11-07T05:31:56Z",
  "shortfall_reason": "insufficient_funds",
  "transaction_external_id": "<string>",
  "fulfillment_ach_identifier": "<string>"
}
'
```

```json
200400default{
  "operation_id": "<string>",
  "status": "accepted",
  "resource_id": "<string>"
}
```

```json
{
  "operation_id": "<string>",
  "status": "accepted",
  "resource_id": "<string>"
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-net-settlements-partner-calculation-based/[experimental]-create-net-settlement-payment-fulfillment*

---

## [Experimental] Get net settlement collection configs

**POST** `/v1/net_settlements/collection_config`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] Get net settlement collection configscURLcurl --request GET \
  --url https://api.parafin.com/v1/net_settlements/collection_config \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/net_settlements/collection_config \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "id": "<string>",
  "capital_product_id": "<string>",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "outstanding_pending_balance": 123,
  "rollover_amount": 123,
  "currency": "AED",
  "is_collection_paused": true,
  "version_number": 123,
  "sales_payment_rate": 123,
  "fixed_payment_amount": 123,
  "collection_paused_at": "2023-11-07T05:31:56Z"
}
```

```json
{
  "id": "<string>",
  "capital_product_id": "<string>",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "outstanding_pending_balance": 123,
  "rollover_amount": 123,
  "currency": "AED",
  "is_collection_paused": true,
  "version_number": 123,
  "sales_payment_rate": 123,
  "fixed_payment_amount": 123,
  "collection_paused_at": "2023-11-07T05:31:56Z"
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-net-settlements-partner-calculation-based/[experimental]-get-net-settlement-collection-configs*

---

## [Experimental] Get net settlement payment fulfillment

**POST** `/v1/net_settlements/payment_fulfillments/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] Get net settlement payment fulfillmentcURLcurl --request GET \
  --url https://api.parafin.com/v1/net_settlements/payment_fulfillments/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/net_settlements/payment_fulfillments/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "status": "created",
  "error": "<string>",
  "fulfillment_detail": {
    "id": "<string>",
    "business_parafin_id": "<string>",
    "capital_product_id": "<string>",
    "sales_period": {
      "start_datetime_inclusive": "2023-11-07T05:31:56Z",
      "end_datetime_exclusive": "2023-11-07T05:31:56Z"
    },
    "target_collection_amount": 123,
    "actual_collection_amount": 123,
    "currency": "AED",
    "status": "created",
    "created_at": "2023-11-07T05:31:56Z",
    "updated_at": "2023-11-07T05:31:56Z",
    "business_external_id": "<string>",
    "shortfall_reason": "insufficient_funds",
    "transaction_external_id": "<string>",
    "fulfillment_ach_identifier": "<string>"
  }
}
```

```json
{
  "id": "<string>",
  "status": "created",
  "error": "<string>",
  "fulfillment_detail": {
    "id": "<string>",
    "business_parafin_id": "<string>",
    "capital_product_id": "<string>",
    "sales_period": {
      "start_datetime_inclusive": "2023-11-07T05:31:56Z",
      "end_datetime_exclusive": "2023-11-07T05:31:56Z"
    },
    "target_collection_amount": 123,
    "actual_collection_amount": 123,
    "currency": "AED",
    "status": "created",
    "created_at": "2023-11-07T05:31:56Z",
    "updated_at": "2023-11-07T05:31:56Z",
    "business_external_id": "<string>",
    "shortfall_reason": "insufficient_funds",
    "transaction_external_id": "<string>",
    "fulfillment_ach_identifier": "<string>"
  }
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-net-settlements-partner-calculation-based/[experimental]-get-net-settlement-payment-fulfillment*

---

## [Experimental] Initiate Payment Fulfillment

**POST** `/v1/net_settlements/payment_fulfillments/{id}/initiation`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] Initiate Payment FulfillmentcURLcurl --request POST \
  --url https://api.parafin.com/v1/net_settlements/payment_fulfillments/{id}/initiation \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "request_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "fulfillment_ach_identifier": "<string>"
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/net_settlements/payment_fulfillments/{id}/initiation \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "request_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "fulfillment_ach_identifier": "<string>"
}
'
```

```json
200400default{
  "operation_id": "<string>",
  "status": "accepted",
  "resource_id": "<string>"
}
```

```json
{
  "operation_id": "<string>",
  "status": "accepted",
  "resource_id": "<string>"
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-net-settlements-partner-calculation-based/[experimental]-initiate-payment-fulfillment*

---

## Get Operation

**POST** `/v1/operation/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get OperationcURLcurl --request GET \
  --url https://api.parafin.com/v1/operation/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/operation/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "operation_type": "net_settlement_fulfillment_creation",
  "status": "accepted",
  "created_at": "2023-11-07T05:31:56Z",
  "updated_at": "2023-11-07T05:31:56Z",
  "resource": {
    "resource_type": "net_settlement_fulfillment",
    "id": "<string>"
  },
  "error": {
    "code": 123,
    "message": "<string>"
  }
}
```

```json
{
  "id": "<string>",
  "operation_type": "net_settlement_fulfillment_creation",
  "status": "accepted",
  "created_at": "2023-11-07T05:31:56Z",
  "updated_at": "2023-11-07T05:31:56Z",
  "resource": {
    "resource_type": "net_settlement_fulfillment",
    "id": "<string>"
  },
  "error": {
    "code": 123,
    "message": "<string>"
  }
}
```

*Source: https://docs.parafin.com/api-reference/operations/get-operation*

---

## Cancel Order

**POST** `/v1/orders/{id}/cancel`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Cancel OrdercURLcurl --request POST \
  --url https://api.parafin.com/v1/orders/{id}/cancel \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/orders/{id}/cancel \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "status": "opened",
  "amount": 123,
  "currency": "USD",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "partner_id": "<string>",
  "refund_summary": {
    "total_refunded": 123,
    "refunds": [
      {
        "id": "<string>",
        "refund_amount": 123,
        "currency": "USD",
        "status": "opened",
        "opened_at": "2023-11-07T05:31:56Z",
        "order_id": "<string>",
        "succeeded_at": "2023-11-07T05:31:56Z",
        "failed_at": "2023-11-07T05:31:56Z",
        "failure_reason": "payment_method_not_refundable"
      }
    ]
  },
  "opened_at": "2023-11-07T05:31:56Z",
  "parafin_redirect_url": "<string>",
  "external_id": "<string>",
  "capital_product_id": "<string>",
  "accepted_at": "2023-11-07T05:31:56Z",
  "declined_at": "2023-11-07T05:31:56Z",
  "canceled_at": "2023-11-07T05:31:56Z",
  "finalized_at": "2023-11-07T05:31:56Z",
  "accept_redirect_url": "<string>",
  "cancel_redirect_url": "<string>"
}
```

```json
{
  "id": "<string>",
  "status": "opened",
  "amount": 123,
  "currency": "USD",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "partner_id": "<string>",
  "refund_summary": {
    "total_refunded": 123,
    "refunds": [
      {
        "id": "<string>",
        "refund_amount": 123,
        "currency": "USD",
        "status": "opened",
        "opened_at": "2023-11-07T05:31:56Z",
        "order_id": "<string>",
        "succeeded_at": "2023-11-07T05:31:56Z",
        "failed_at": "2023-11-07T05:31:56Z",
        "failure_reason": "payment_method_not_refundable"
      }
    ]
  },
  "opened_at": "2023-11-07T05:31:56Z",
  "parafin_redirect_url": "<string>",
  "external_id": "<string>",
  "capital_product_id": "<string>",
  "accepted_at": "2023-11-07T05:31:56Z",
  "declined_at": "2023-11-07T05:31:56Z",
  "canceled_at": "2023-11-07T05:31:56Z",
  "finalized_at": "2023-11-07T05:31:56Z",
  "accept_redirect_url": "<string>",
  "cancel_redirect_url": "<string>"
}
```

*Source: https://docs.parafin.com/api-reference/orders/cancel-order*

---

## List Orders

**POST** `/v1/orders`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List OrderscURLcurl --request GET \
  --url https://api.parafin.com/v1/orders \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/orders \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "status": "opened",
      "amount": 123,
      "currency": "USD",
      "business_parafin_id": "<string>",
      "business_external_id": "<string>",
      "partner_id": "<string>",
      "refund_summary": {
        "total_refunded": 123,
        "refunds": [
          {
            "id": "<string>",
            "refund_amount": 123,
            "currency": "USD",
            "status": "opened",
            "opened_at": "2023-11-07T05:31:56Z",
            "order_id": "<string>",
            "succeeded_at": "2023-11-07T05:31:56Z",
            "failed_at": "2023-11-07T05:31:56Z",
            "failure_reason": "payment_method_not_refundable"
          }
        ]
      },
      "opened_at": "2023-11-07T05:31:56Z",
      "parafin_redirect_url": "<string>",
      "external_id": "<string>",
      "capital_product_id": "<string>",
      "accepted_at": "2023-11-07T05:31:56Z",
      "declined_at": "2023-11-07T05:31:56Z",
      "canceled_at": "2023-11-07T05:31:56Z",
      "finalized_at": "2023-11-07T05:31:56Z",
      "accept_redirect_url": "<string>",
      "cancel_redirect_url": "<string>"
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "status": "opened",
      "amount": 123,
      "currency": "USD",
      "business_parafin_id": "<string>",
      "business_external_id": "<string>",
      "partner_id": "<string>",
      "refund_summary": {
        "total_refunded": 123,
        "refunds": [
          {
            "id": "<string>",
            "refund_amount": 123,
            "currency": "USD",
            "status": "opened",
            "opened_at": "2023-11-07T05:31:56Z",
            "order_id": "<string>",
            "succeeded_at": "2023-11-07T05:31:56Z",
            "failed_at": "2023-11-07T05:31:56Z",
            "failure_reason": "payment_method_not_refundable"
          }
        ]
      },
      "opened_at": "2023-11-07T05:31:56Z",
      "parafin_redirect_url": "<string>",
      "external_id": "<string>",
      "capital_product_id": "<string>",
      "accepted_at": "2023-11-07T05:31:56Z",
      "declined_at": "2023-11-07T05:31:56Z",
      "canceled_at": "2023-11-07T05:31:56Z",
      "finalized_at": "2023-11-07T05:31:56Z",
      "accept_redirect_url": "<string>",
      "cancel_redirect_url": "<string>"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/orders/list-orders*

---

## Finalize Order

**POST** `/v1/orders/{id}/finalize`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Finalize OrdercURLcurl --request POST \
  --url https://api.parafin.com/v1/orders/{id}/finalize \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/orders/{id}/finalize \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "status": "opened",
  "amount": 123,
  "currency": "USD",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "partner_id": "<string>",
  "refund_summary": {
    "total_refunded": 123,
    "refunds": [
      {
        "id": "<string>",
        "refund_amount": 123,
        "currency": "USD",
        "status": "opened",
        "opened_at": "2023-11-07T05:31:56Z",
        "order_id": "<string>",
        "succeeded_at": "2023-11-07T05:31:56Z",
        "failed_at": "2023-11-07T05:31:56Z",
        "failure_reason": "payment_method_not_refundable"
      }
    ]
  },
  "opened_at": "2023-11-07T05:31:56Z",
  "parafin_redirect_url": "<string>",
  "external_id": "<string>",
  "capital_product_id": "<string>",
  "accepted_at": "2023-11-07T05:31:56Z",
  "declined_at": "2023-11-07T05:31:56Z",
  "canceled_at": "2023-11-07T05:31:56Z",
  "finalized_at": "2023-11-07T05:31:56Z",
  "accept_redirect_url": "<string>",
  "cancel_redirect_url": "<string>"
}
```

```json
{
  "id": "<string>",
  "status": "opened",
  "amount": 123,
  "currency": "USD",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "partner_id": "<string>",
  "refund_summary": {
    "total_refunded": 123,
    "refunds": [
      {
        "id": "<string>",
        "refund_amount": 123,
        "currency": "USD",
        "status": "opened",
        "opened_at": "2023-11-07T05:31:56Z",
        "order_id": "<string>",
        "succeeded_at": "2023-11-07T05:31:56Z",
        "failed_at": "2023-11-07T05:31:56Z",
        "failure_reason": "payment_method_not_refundable"
      }
    ]
  },
  "opened_at": "2023-11-07T05:31:56Z",
  "parafin_redirect_url": "<string>",
  "external_id": "<string>",
  "capital_product_id": "<string>",
  "accepted_at": "2023-11-07T05:31:56Z",
  "declined_at": "2023-11-07T05:31:56Z",
  "canceled_at": "2023-11-07T05:31:56Z",
  "finalized_at": "2023-11-07T05:31:56Z",
  "accept_redirect_url": "<string>",
  "cancel_redirect_url": "<string>"
}
```

*Source: https://docs.parafin.com/api-reference/orders/finalize-order*

---

## Get Order

**POST** `/v1/orders/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get OrdercURLcurl --request GET \
  --url https://api.parafin.com/v1/orders/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/orders/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "status": "opened",
  "amount": 123,
  "currency": "USD",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "partner_id": "<string>",
  "refund_summary": {
    "total_refunded": 123,
    "refunds": [
      {
        "id": "<string>",
        "refund_amount": 123,
        "currency": "USD",
        "status": "opened",
        "opened_at": "2023-11-07T05:31:56Z",
        "order_id": "<string>",
        "succeeded_at": "2023-11-07T05:31:56Z",
        "failed_at": "2023-11-07T05:31:56Z",
        "failure_reason": "payment_method_not_refundable"
      }
    ]
  },
  "opened_at": "2023-11-07T05:31:56Z",
  "parafin_redirect_url": "<string>",
  "external_id": "<string>",
  "capital_product_id": "<string>",
  "accepted_at": "2023-11-07T05:31:56Z",
  "declined_at": "2023-11-07T05:31:56Z",
  "canceled_at": "2023-11-07T05:31:56Z",
  "finalized_at": "2023-11-07T05:31:56Z",
  "accept_redirect_url": "<string>",
  "cancel_redirect_url": "<string>"
}
```

```json
{
  "id": "<string>",
  "status": "opened",
  "amount": 123,
  "currency": "USD",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "partner_id": "<string>",
  "refund_summary": {
    "total_refunded": 123,
    "refunds": [
      {
        "id": "<string>",
        "refund_amount": 123,
        "currency": "USD",
        "status": "opened",
        "opened_at": "2023-11-07T05:31:56Z",
        "order_id": "<string>",
        "succeeded_at": "2023-11-07T05:31:56Z",
        "failed_at": "2023-11-07T05:31:56Z",
        "failure_reason": "payment_method_not_refundable"
      }
    ]
  },
  "opened_at": "2023-11-07T05:31:56Z",
  "parafin_redirect_url": "<string>",
  "external_id": "<string>",
  "capital_product_id": "<string>",
  "accepted_at": "2023-11-07T05:31:56Z",
  "declined_at": "2023-11-07T05:31:56Z",
  "canceled_at": "2023-11-07T05:31:56Z",
  "finalized_at": "2023-11-07T05:31:56Z",
  "accept_redirect_url": "<string>",
  "cancel_redirect_url": "<string>"
}
```

*Source: https://docs.parafin.com/api-reference/orders/get-order*

---

## [Experimental] Create Order

**POST** `/v1/orders`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] Create OrdercURLcurl --request POST \
  --url https://api.parafin.com/v1/orders \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "amount": 123,
  "currency": "USD",
  "business_parafin_id": "<string>",
  "external_id": "<string>",
  "accept_redirect_url": "<string>",
  "cancel_redirect_url": "<string>"
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/orders \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "amount": 123,
  "currency": "USD",
  "business_parafin_id": "<string>",
  "external_id": "<string>",
  "accept_redirect_url": "<string>",
  "cancel_redirect_url": "<string>"
}
'
```

```json
200400default{
  "id": "<string>",
  "status": "opened",
  "amount": 123,
  "currency": "USD",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "partner_id": "<string>",
  "refund_summary": {
    "total_refunded": 123,
    "refunds": [
      {
        "id": "<string>",
        "refund_amount": 123,
        "currency": "USD",
        "status": "opened",
        "opened_at": "2023-11-07T05:31:56Z",
        "order_id": "<string>",
        "succeeded_at": "2023-11-07T05:31:56Z",
        "failed_at": "2023-11-07T05:31:56Z",
        "failure_reason": "payment_method_not_refundable"
      }
    ]
  },
  "opened_at": "2023-11-07T05:31:56Z",
  "parafin_redirect_url": "<string>",
  "external_id": "<string>",
  "capital_product_id": "<string>",
  "accepted_at": "2023-11-07T05:31:56Z",
  "declined_at": "2023-11-07T05:31:56Z",
  "canceled_at": "2023-11-07T05:31:56Z",
  "finalized_at": "2023-11-07T05:31:56Z",
  "accept_redirect_url": "<string>",
  "cancel_redirect_url": "<string>"
}
```

```json
{
  "id": "<string>",
  "status": "opened",
  "amount": 123,
  "currency": "USD",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "partner_id": "<string>",
  "refund_summary": {
    "total_refunded": 123,
    "refunds": [
      {
        "id": "<string>",
        "refund_amount": 123,
        "currency": "USD",
        "status": "opened",
        "opened_at": "2023-11-07T05:31:56Z",
        "order_id": "<string>",
        "succeeded_at": "2023-11-07T05:31:56Z",
        "failed_at": "2023-11-07T05:31:56Z",
        "failure_reason": "payment_method_not_refundable"
      }
    ]
  },
  "opened_at": "2023-11-07T05:31:56Z",
  "parafin_redirect_url": "<string>",
  "external_id": "<string>",
  "capital_product_id": "<string>",
  "accepted_at": "2023-11-07T05:31:56Z",
  "declined_at": "2023-11-07T05:31:56Z",
  "canceled_at": "2023-11-07T05:31:56Z",
  "finalized_at": "2023-11-07T05:31:56Z",
  "accept_redirect_url": "<string>",
  "cancel_redirect_url": "<string>"
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-orders/[experimental]-create-order*

---

## Create multiple Payment Processor Entity Business Links

**POST** `/v1/payment_processor_entity_business_links/batch_create`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create multiple Payment Processor Entity Business LinkscURLcurl --request POST \
  --url https://api.parafin.com/v1/payment_processor_entity_business_links/batch_create \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "payment_processor_type": "stripe",
  "links": [
    {
      "entity_id": "<string>",
      "business_external_id": "<string>"
    }
  ]
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/payment_processor_entity_business_links/batch_create \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "payment_processor_type": "stripe",
  "links": [
    {
      "entity_id": "<string>",
      "business_external_id": "<string>"
    }
  ]
}
'
```

```json
200400default{
  "results": [
    {
      "payment_processor_type": "stripe",
      "entity_id": "<string>",
      "business_external_id": "<string>",
      "created_at": "2023-11-07T05:31:56Z",
      "business_parafin_id": "<string>"
    }
  ]
}
```

```json
{
  "results": [
    {
      "payment_processor_type": "stripe",
      "entity_id": "<string>",
      "business_external_id": "<string>",
      "created_at": "2023-11-07T05:31:56Z",
      "business_parafin_id": "<string>"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/payment-processor-entity-business-links/create-multiple-payment-processor-entity-business-links*

---

## List Payment Processor Entity Business Links

**POST** `/v1/payment_processor_entity_business_links`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List Payment Processor Entity Business LinkscURLcurl --request GET \
  --url https://api.parafin.com/v1/payment_processor_entity_business_links \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/payment_processor_entity_business_links \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "payment_processor_type": "stripe",
      "entity_id": "<string>",
      "business_external_id": "<string>",
      "created_at": "2023-11-07T05:31:56Z",
      "business_parafin_id": "<string>"
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "payment_processor_type": "stripe",
      "entity_id": "<string>",
      "business_external_id": "<string>",
      "created_at": "2023-11-07T05:31:56Z",
      "business_parafin_id": "<string>"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/payment-processor-entity-business-links/list-payment-processor-entity-business-links*

---

## Create Payment Processor Entity Business Link

**POST** `/v1/payment_processor_entity_business_links`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create Payment Processor Entity Business LinkcURLcurl --request POST \
  --url https://api.parafin.com/v1/payment_processor_entity_business_links \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "entity_id": "<string>",
  "business_external_id": "<string>",
  "payment_processor_type": "stripe"
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/payment_processor_entity_business_links \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "entity_id": "<string>",
  "business_external_id": "<string>",
  "payment_processor_type": "stripe"
}
'
```

```json
200400default{
  "payment_processor_type": "stripe",
  "entity_id": "<string>",
  "business_external_id": "<string>",
  "created_at": "2023-11-07T05:31:56Z",
  "business_parafin_id": "<string>"
}
```

```json
{
  "payment_processor_type": "stripe",
  "entity_id": "<string>",
  "business_external_id": "<string>",
  "created_at": "2023-11-07T05:31:56Z",
  "business_parafin_id": "<string>"
}
```

*Source: https://docs.parafin.com/api-reference/payment-processor-entity-business-links/create-payment-processor-entity-business-link*

---

## Create multiple Payments

**POST** `/v1/payments/batch_create`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create multiple Payments cURLcurl --request POST \
  --url https://api.parafin.com/v1/payments/batch_create \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requests": [
    {
      "total_amount": 123,
      "currency": "USD",
      "occurred_at": "2023-11-07T05:31:56Z",
      "business_id": "<string>",
      "external_id": "<string>"
    }
  ]
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/payments/batch_create \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requests": [
    {
      "total_amount": 123,
      "currency": "USD",
      "occurred_at": "2023-11-07T05:31:56Z",
      "business_id": "<string>",
      "external_id": "<string>"
    }
  ]
}
'
```

```json
200400default{
  "results": [
    {
      "id": "<string>",
      "total_amount": 123,
      "currency": "USD",
      "occurred_at": "2023-11-07T05:31:56Z",
      "business_id": "<string>",
      "external_id": "<string>"
    }
  ]
}
```

```json
{
  "results": [
    {
      "id": "<string>",
      "total_amount": 123,
      "currency": "USD",
      "occurred_at": "2023-11-07T05:31:56Z",
      "business_id": "<string>",
      "external_id": "<string>"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/payments/create-multiple-payments*

---

## List Payments

**POST** `/v1/payments`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List Payments cURLcurl --request GET \
  --url https://api.parafin.com/v1/payments \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/payments \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "total_amount": 123,
      "currency": "USD",
      "occurred_at": "2023-11-07T05:31:56Z",
      "business_id": "<string>",
      "external_id": "<string>"
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "total_amount": 123,
      "currency": "USD",
      "occurred_at": "2023-11-07T05:31:56Z",
      "business_id": "<string>",
      "external_id": "<string>"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/payments/list-payments*

---

## Create Payment

**POST** `/v1/payments`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create PaymentcURLcurl --request POST \
  --url https://api.parafin.com/v1/payments \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "total_amount": 123,
  "currency": "USD",
  "occurred_at": "2023-11-07T05:31:56Z",
  "business_id": "<string>",
  "external_id": "<string>"
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/payments \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "total_amount": 123,
  "currency": "USD",
  "occurred_at": "2023-11-07T05:31:56Z",
  "business_id": "<string>",
  "external_id": "<string>"
}
'
```

```json
200400default{
  "id": "<string>",
  "total_amount": 123,
  "currency": "USD",
  "occurred_at": "2023-11-07T05:31:56Z",
  "business_id": "<string>",
  "external_id": "<string>"
}
```

```json
{
  "id": "<string>",
  "total_amount": 123,
  "currency": "USD",
  "occurred_at": "2023-11-07T05:31:56Z",
  "business_id": "<string>",
  "external_id": "<string>"
}
```

*Source: https://docs.parafin.com/api-reference/payments/create-payment*

---

## Get Payment

**POST** `/v1/payments/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get PaymentcURLcurl --request GET \
  --url https://api.parafin.com/v1/payments/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/payments/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "total_amount": 123,
  "currency": "USD",
  "occurred_at": "2023-11-07T05:31:56Z",
  "business_id": "<string>",
  "external_id": "<string>"
}
```

```json
{
  "id": "<string>",
  "total_amount": 123,
  "currency": "USD",
  "occurred_at": "2023-11-07T05:31:56Z",
  "business_id": "<string>",
  "external_id": "<string>"
}
```

*Source: https://docs.parafin.com/api-reference/payments/get-payment*

---

## Create multiple Person Business Relationships

**POST** `/v1/person_business_relationships/batch_create`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create multiple Person Business RelationshipscURLcurl --request POST \
  --url https://api.parafin.com/v1/person_business_relationships/batch_create \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requests": [
    {
      "person_id": "<string>",
      "representative": true,
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "beneficial_owner": true,
      "custom_data": {}
    }
  ]
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/person_business_relationships/batch_create \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requests": [
    {
      "person_id": "<string>",
      "representative": true,
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "beneficial_owner": true,
      "custom_data": {}
    }
  ]
}
'
```

```json
200400default{
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "person_id": "<string>",
      "representative": true,
      "beneficial_owner": true,
      "custom_data": {}
    }
  ]
}
```

```json
{
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "person_id": "<string>",
      "representative": true,
      "beneficial_owner": true,
      "custom_data": {}
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/person-business-relationships/create-multiple-person-business-relationships*

---

## Change Representative

**POST** `/v1/person_business_relationships/change_representative`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Change RepresentativecURLcurl --request POST \
  --url https://api.parafin.com/v1/person_business_relationships/change_representative \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "business_parafin_id": "<string>",
  "new_representative_id": "<string>",
  "beneficial_owner": true,
  "custom_data": {}
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/person_business_relationships/change_representative \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "business_parafin_id": "<string>",
  "new_representative_id": "<string>",
  "beneficial_owner": true,
  "custom_data": {}
}
'
```

```json
200400default{
  "id": "<string>",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "person_id": "<string>",
  "representative": true,
  "beneficial_owner": true,
  "custom_data": {}
}
```

```json
{
  "id": "<string>",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "person_id": "<string>",
  "representative": true,
  "beneficial_owner": true,
  "custom_data": {}
}
```

*Source: https://docs.parafin.com/api-reference/person-business-relationships/change-representative*

---

## List Person Business Relationships

**POST** `/v1/person_business_relationships`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List Person Business RelationshipscURLcurl --request GET \
  --url https://api.parafin.com/v1/person_business_relationships \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/person_business_relationships \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "person_id": "<string>",
      "representative": true,
      "beneficial_owner": true,
      "custom_data": {}
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "business_id": "<string>",
      "business_parafin_id": "<string>",
      "person_id": "<string>",
      "representative": true,
      "beneficial_owner": true,
      "custom_data": {}
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/person-business-relationships/list-person-business-relationships*

---

## Create Person Business Relationship

**POST** `/v1/person_business_relationships`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create Person Business RelationshipcURLcurl --request POST \
  --url https://api.parafin.com/v1/person_business_relationships \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "person_id": "<string>",
  "representative": true,
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "beneficial_owner": true,
  "custom_data": {}
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/person_business_relationships \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "person_id": "<string>",
  "representative": true,
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "beneficial_owner": true,
  "custom_data": {}
}
'
```

```json
200400default{
  "id": "<string>",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "person_id": "<string>",
  "representative": true,
  "beneficial_owner": true,
  "custom_data": {}
}
```

```json
{
  "id": "<string>",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "person_id": "<string>",
  "representative": true,
  "beneficial_owner": true,
  "custom_data": {}
}
```

*Source: https://docs.parafin.com/api-reference/person-business-relationships/create-person-business-relationship*

---

## Get Person Business Relationship

**POST** `/v1/person_business_relationships/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get Person Business RelationshipcURLcurl --request GET \
  --url https://api.parafin.com/v1/person_business_relationships/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/person_business_relationships/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "person_id": "<string>",
  "representative": true,
  "beneficial_owner": true,
  "custom_data": {}
}
```

```json
{
  "id": "<string>",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "person_id": "<string>",
  "representative": true,
  "beneficial_owner": true,
  "custom_data": {}
}
```

*Source: https://docs.parafin.com/api-reference/person-business-relationships/get-person-business-relationship*

---

## Create multiple Persons

**POST** `/v1/persons/batch_create`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create multiple PersonscURLcurl --request POST \
  --url https://api.parafin.com/v1/persons/batch_create \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requests": [
    {
      "first_name": "<string>",
      "last_name": "<string>",
      "contact_email": "<string>",
      "contact_phone": "<string>",
      "address": {
        "line1": "<string>",
        "city": "<string>",
        "state": "AL",
        "country": "<string>",
        "postal_code": "<string>",
        "line2": "<string>"
      },
      "linked_businesses": [
        {
          "business_id": "<string>",
          "relationship": {
            "is_beneficial_owner": true,
            "is_representative": true
          }
        }
      ],
      "custom_data": {},
      "external_id": "<string>"
    }
  ]
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/persons/batch_create \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requests": [
    {
      "first_name": "<string>",
      "last_name": "<string>",
      "contact_email": "<string>",
      "contact_phone": "<string>",
      "address": {
        "line1": "<string>",
        "city": "<string>",
        "state": "AL",
        "country": "<string>",
        "postal_code": "<string>",
        "line2": "<string>"
      },
      "linked_businesses": [
        {
          "business_id": "<string>",
          "relationship": {
            "is_beneficial_owner": true,
            "is_representative": true
          }
        }
      ],
      "custom_data": {},
      "external_id": "<string>"
    }
  ]
}
'
```

```json
200400default{
  "results": [
    {
      "id": "<string>",
      "first_name": "<string>",
      "last_name": "<string>",
      "contact_email": "<string>",
      "contact_phone": "<string>",
      "address": {
        "line1": "<string>",
        "city": "<string>",
        "state": "AL",
        "country": "<string>",
        "postal_code": "<string>",
        "line2": "<string>"
      },
      "linked_businesses": [
        "<string>"
      ],
      "custom_data": {},
      "external_id": "<string>"
    }
  ]
}
```

```json
{
  "results": [
    {
      "id": "<string>",
      "first_name": "<string>",
      "last_name": "<string>",
      "contact_email": "<string>",
      "contact_phone": "<string>",
      "address": {
        "line1": "<string>",
        "city": "<string>",
        "state": "AL",
        "country": "<string>",
        "postal_code": "<string>",
        "line2": "<string>"
      },
      "linked_businesses": [
        "<string>"
      ],
      "custom_data": {},
      "external_id": "<string>"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/persons/create-multiple-persons*

---

## List Persons

**POST** `/v1/persons`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List PersonscURLcurl --request GET \
  --url https://api.parafin.com/v1/persons \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/persons \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "first_name": "<string>",
      "last_name": "<string>",
      "contact_email": "<string>",
      "contact_phone": "<string>",
      "address": {
        "line1": "<string>",
        "city": "<string>",
        "state": "AL",
        "country": "<string>",
        "postal_code": "<string>",
        "line2": "<string>"
      },
      "linked_businesses": [
        "<string>"
      ],
      "custom_data": {},
      "external_id": "<string>"
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "first_name": "<string>",
      "last_name": "<string>",
      "contact_email": "<string>",
      "contact_phone": "<string>",
      "address": {
        "line1": "<string>",
        "city": "<string>",
        "state": "AL",
        "country": "<string>",
        "postal_code": "<string>",
        "line2": "<string>"
      },
      "linked_businesses": [
        "<string>"
      ],
      "custom_data": {},
      "external_id": "<string>"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/persons/list-persons*

---

## Create Person

**POST** `/v1/persons`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create PersoncURLcurl --request POST \
  --url https://api.parafin.com/v1/persons \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "first_name": "<string>",
  "last_name": "<string>",
  "contact_email": "<string>",
  "contact_phone": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "linked_businesses": [
    {
      "business_id": "<string>",
      "relationship": {
        "is_beneficial_owner": true,
        "is_representative": true
      }
    }
  ],
  "custom_data": {},
  "external_id": "<string>"
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/persons \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "first_name": "<string>",
  "last_name": "<string>",
  "contact_email": "<string>",
  "contact_phone": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "linked_businesses": [
    {
      "business_id": "<string>",
      "relationship": {
        "is_beneficial_owner": true,
        "is_representative": true
      }
    }
  ],
  "custom_data": {},
  "external_id": "<string>"
}
'
```

```json
200400default{
  "id": "<string>",
  "first_name": "<string>",
  "last_name": "<string>",
  "contact_email": "<string>",
  "contact_phone": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "linked_businesses": [
    "<string>"
  ],
  "custom_data": {},
  "external_id": "<string>"
}
```

```json
{
  "id": "<string>",
  "first_name": "<string>",
  "last_name": "<string>",
  "contact_email": "<string>",
  "contact_phone": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "linked_businesses": [
    "<string>"
  ],
  "custom_data": {},
  "external_id": "<string>"
}
```

*Source: https://docs.parafin.com/api-reference/persons/create-person*

---

## Get Person

**POST** `/v1/persons/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get PersoncURLcurl --request GET \
  --url https://api.parafin.com/v1/persons/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/persons/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "first_name": "<string>",
  "last_name": "<string>",
  "contact_email": "<string>",
  "contact_phone": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "linked_businesses": [
    "<string>"
  ],
  "custom_data": {},
  "external_id": "<string>"
}
```

```json
{
  "id": "<string>",
  "first_name": "<string>",
  "last_name": "<string>",
  "contact_email": "<string>",
  "contact_phone": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "linked_businesses": [
    "<string>"
  ],
  "custom_data": {},
  "external_id": "<string>"
}
```

*Source: https://docs.parafin.com/api-reference/persons/get-person*

---

## Update Person

**POST** `/v1/persons/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Update PersoncURLcurl --request PATCH \
  --url https://api.parafin.com/v1/persons/{id} \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "first_name": "<string>",
  "last_name": "<string>",
  "contact_email": "<string>",
  "contact_phone": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "custom_data": {}
}
'
```

```bash
curl --request PATCH \
  --url https://api.parafin.com/v1/persons/{id} \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "first_name": "<string>",
  "last_name": "<string>",
  "contact_email": "<string>",
  "contact_phone": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "custom_data": {}
}
'
```

```json
200400default{
  "id": "<string>",
  "first_name": "<string>",
  "last_name": "<string>",
  "contact_email": "<string>",
  "contact_phone": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "linked_businesses": [
    "<string>"
  ],
  "custom_data": {},
  "external_id": "<string>"
}
```

```json
{
  "id": "<string>",
  "first_name": "<string>",
  "last_name": "<string>",
  "contact_email": "<string>",
  "contact_phone": "<string>",
  "address": {
    "line1": "<string>",
    "city": "<string>",
    "state": "AL",
    "country": "<string>",
    "postal_code": "<string>",
    "line2": "<string>"
  },
  "linked_businesses": [
    "<string>"
  ],
  "custom_data": {},
  "external_id": "<string>"
}
```

*Source: https://docs.parafin.com/api-reference/persons/update-person*

---

## [Experimental] Create multiple Processor Tokens

**POST** `/v1/processor_tokens/batch_create`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] Create multiple Processor TokenscURLcurl --request POST \
  --url https://api.parafin.com/v1/processor_tokens/batch_create \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requests": [
    {
      "token": {
        "value": "<string>"
      },
      "provider": "plaid",
      "business_parafin_id": "<string>",
      "business_external_id": "<string>"
    }
  ]
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/processor_tokens/batch_create \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requests": [
    {
      "token": {
        "value": "<string>"
      },
      "provider": "plaid",
      "business_parafin_id": "<string>",
      "business_external_id": "<string>"
    }
  ]
}
'
```

```json
200400default{
  "results": [
    {
      "id": "<string>",
      "submitted_at": "2023-11-07T05:31:56Z",
      "business_parafin_id": "<string>",
      "business_external_id": "<string>",
      "provider": "plaid",
      "state": "active"
    }
  ]
}
```

```json
{
  "results": [
    {
      "id": "<string>",
      "submitted_at": "2023-11-07T05:31:56Z",
      "business_parafin_id": "<string>",
      "business_external_id": "<string>",
      "provider": "plaid",
      "state": "active"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-processor-tokens/[experimental]-create-multiple-processor-tokens*

---

## [Experimental] List Processor Tokens

**POST** `/v1/processor_tokens`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] List Processor TokenscURLcurl --request GET \
  --url https://api.parafin.com/v1/processor_tokens \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/processor_tokens \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "submitted_at": "2023-11-07T05:31:56Z",
      "business_parafin_id": "<string>",
      "business_external_id": "<string>",
      "provider": "plaid",
      "state": "active"
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "submitted_at": "2023-11-07T05:31:56Z",
      "business_parafin_id": "<string>",
      "business_external_id": "<string>",
      "provider": "plaid",
      "state": "active"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-processor-tokens/[experimental]-list-processor-tokens*

---

## [Experimental] Create Processor Token

**POST** `/v1/processor_tokens`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] Create Processor TokencURLcurl --request POST \
  --url https://api.parafin.com/v1/processor_tokens \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "token": {
    "value": "<string>"
  },
  "provider": "plaid",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>"
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/processor_tokens \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "token": {
    "value": "<string>"
  },
  "provider": "plaid",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>"
}
'
```

```json
200400default{
  "id": "<string>",
  "submitted_at": "2023-11-07T05:31:56Z",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "provider": "plaid",
  "state": "active"
}
```

```json
{
  "id": "<string>",
  "submitted_at": "2023-11-07T05:31:56Z",
  "business_parafin_id": "<string>",
  "business_external_id": "<string>",
  "provider": "plaid",
  "state": "active"
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-processor-tokens/[experimental]-create-processor-token*

---

## List Refunds

**POST** `/v1/refunds`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List RefundscURLcurl --request GET \
  --url https://api.parafin.com/v1/refunds \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/refunds \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "refund_amount": 123,
      "currency": "USD",
      "status": "opened",
      "opened_at": "2023-11-07T05:31:56Z",
      "order_id": "<string>",
      "succeeded_at": "2023-11-07T05:31:56Z",
      "failed_at": "2023-11-07T05:31:56Z",
      "failure_reason": "payment_method_not_refundable"
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "refund_amount": 123,
      "currency": "USD",
      "status": "opened",
      "opened_at": "2023-11-07T05:31:56Z",
      "order_id": "<string>",
      "succeeded_at": "2023-11-07T05:31:56Z",
      "failed_at": "2023-11-07T05:31:56Z",
      "failure_reason": "payment_method_not_refundable"
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/refunds/list-refunds*

---

## Get Refund

**POST** `/v1/refunds/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get RefundcURLcurl --request GET \
  --url https://api.parafin.com/v1/refunds/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/refunds/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "refund_amount": 123,
  "currency": "USD",
  "status": "opened",
  "opened_at": "2023-11-07T05:31:56Z",
  "order_id": "<string>",
  "succeeded_at": "2023-11-07T05:31:56Z",
  "failed_at": "2023-11-07T05:31:56Z",
  "failure_reason": "payment_method_not_refundable"
}
```

```json
{
  "id": "<string>",
  "refund_amount": 123,
  "currency": "USD",
  "status": "opened",
  "opened_at": "2023-11-07T05:31:56Z",
  "order_id": "<string>",
  "succeeded_at": "2023-11-07T05:31:56Z",
  "failed_at": "2023-11-07T05:31:56Z",
  "failure_reason": "payment_method_not_refundable"
}
```

*Source: https://docs.parafin.com/api-reference/refunds/get-refund*

---

## [Experimental] Create Refund

**POST** `/v1/refunds`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[Experimental] Create RefundcURLcurl --request POST \
  --url https://api.parafin.com/v1/refunds \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "amount": 123,
  "currency": "USD",
  "order_id": "<string>"
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/refunds \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "amount": 123,
  "currency": "USD",
  "order_id": "<string>"
}
'
```

```json
200400default{
  "id": "<string>",
  "refund_amount": 123,
  "currency": "USD",
  "status": "opened",
  "opened_at": "2023-11-07T05:31:56Z",
  "order_id": "<string>",
  "succeeded_at": "2023-11-07T05:31:56Z",
  "failed_at": "2023-11-07T05:31:56Z",
  "failure_reason": "payment_method_not_refundable"
}
```

```json
{
  "id": "<string>",
  "refund_amount": 123,
  "currency": "USD",
  "status": "opened",
  "opened_at": "2023-11-07T05:31:56Z",
  "order_id": "<string>",
  "succeeded_at": "2023-11-07T05:31:56Z",
  "failed_at": "2023-11-07T05:31:56Z",
  "failure_reason": "payment_method_not_refundable"
}
```

*Source: https://docs.parafin.com/api-reference/[experimental]-refunds/[experimental]-create-refund*

---

## [deprecated] Generate Capital Product Offer

**POST** `/v1/sandbox/capital_product_offer`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
[deprecated] Generate Capital Product OffercURLcurl --request POST \
  --url https://api.parafin.com/v1/sandbox/capital_product_offer \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "product_type": "merchant_cash_advance",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "include_fee_discount": true,
  "max_amount": 123,
  "campaign_type": "pre_approved"
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/sandbox/capital_product_offer \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "product_type": "merchant_cash_advance",
  "business_id": "<string>",
  "business_parafin_id": "<string>",
  "include_fee_discount": true,
  "max_amount": 123,
  "campaign_type": "pre_approved"
}
'
```

```json
200400default{
  "offer_id": "<string>",
  "offer_url": "<string>"
}
```

```json
{
  "offer_id": "<string>",
  "offer_url": "<string>"
}
```

*Source: https://docs.parafin.com/api-reference/sandbox/[deprecated]-generate-capital-product-offer*

---

## Fund Capital Product

**POST** `/v1/sandbox/fund_capital_product`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Fund Capital ProductcURLcurl --request POST \
  --url https://api.parafin.com/v1/sandbox/fund_capital_product \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "business_parafin_id": "<string>",
  "business_id": "<string>"
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/sandbox/fund_capital_product \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "business_parafin_id": "<string>",
  "business_id": "<string>"
}
'
```

*Source: https://docs.parafin.com/api-reference/sandbox/fund-capital-product*

---

## Trigger Webhook

**POST** `/v1/sandbox/trigger_webhook`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Trigger WebhookcURLcurl --request POST \
  --url https://api.parafin.com/v1/sandbox/trigger_webhook \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "webhook_event_type": "cash_advance_offer_created",
  "business_external_id": "<string>",
  "business_parafin_id": "<string>",
  "business_id": "<string>",
  "person_id": "<string>",
  "campaign_type": "pre_approved"
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/sandbox/trigger_webhook \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "webhook_event_type": "cash_advance_offer_created",
  "business_external_id": "<string>",
  "business_parafin_id": "<string>",
  "business_id": "<string>",
  "person_id": "<string>",
  "campaign_type": "pre_approved"
}
'
```

```json
200400default{
  "success": true
}
```

```json
{
  "success": true
}
```

*Source: https://docs.parafin.com/api-reference/sandbox/trigger-webhook*

---

## Capital Product Offer Closed (Sandbox)

**POST** `/v1/sandbox/generate_event/capital_product_offer/closed`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Capital Product Offer Closed (Sandbox)cURLcurl --request POST \
  --url https://api.parafin.com/v1/sandbox/generate_event/capital_product_offer/closed \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "business": {
    "business_external_id": "<string>",
    "legal_name": "<string>",
    "dba_name": "<string>",
    "established_date": "2023-12-25",
    "incorporation_state": "AL",
    "incorporation_type": "llc",
    "address": {
      "line1": "<string>",
      "city": "<string>",
      "state": "AL",
      "country": "<string>",
      "postal_code": "<string>",
      "line2": "<string>"
    },
    "mcc": "<string>"
  },
  "bank_account": {
    "routing_number": "<string>",
    "account_number": {
      "last4": "<string>",
      "full": "<string>"
    },
    "currency": "USD",
    "is_verified": true
  },
  "person": {
    "first_name": "<string>",
    "last_name": "<string>",
    "contact_email": "<string>",
    "contact_phone": "<string>",
    "address": {
      "line1": "<string>",
      "city": "<string>",
      "state": "AL",
      "country": "<string>",
      "postal_code": "<string>",
      "line2": "<string>"
    }
  },
  "capital_product_offer": {
    "product_type": "merchant_cash_advance",
    "max_offer_amount": 123,
    "include_fee_discount": true
  }
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/sandbox/generate_event/capital_product_offer/closed \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "business": {
    "business_external_id": "<string>",
    "legal_name": "<string>",
    "dba_name": "<string>",
    "established_date": "2023-12-25",
    "incorporation_state": "AL",
    "incorporation_type": "llc",
    "address": {
      "line1": "<string>",
      "city": "<string>",
      "state": "AL",
      "country": "<string>",
      "postal_code": "<string>",
      "line2": "<string>"
    },
    "mcc": "<string>"
  },
  "bank_account": {
    "routing_number": "<string>",
    "account_number": {
      "last4": "<string>",
      "full": "<string>"
    },
    "currency": "USD",
    "is_verified": true
  },
  "person": {
    "first_name": "<string>",
    "last_name": "<string>",
    "contact_email": "<string>",
    "contact_phone": "<string>",
    "address": {
      "line1": "<string>",
      "city": "<string>",
      "state": "AL",
      "country": "<string>",
      "postal_code": "<string>",
      "line2": "<string>"
    }
  },
  "capital_product_offer": {
    "product_type": "merchant_cash_advance",
    "max_offer_amount": 123,
    "include_fee_discount": true
  }
}
'
```

```json
200400default{
  "business": {
    "id": "<string>",
    "legal_name": "<string>",
    "dba_name": "<string>",
    "address": {
      "line1": "<string>",
      "city": "<string>",
      "state": "AL",
      "country": "<string>",
      "postal_code": "<string>",
      "line2": "<string>"
    },
    "established_date": "2023-12-25",
    "incorporation_state": "AL",
    "incorporation_type": "llc",
    "mcc": "<string>",
    "linked_persons": [
      {
        "id": "<string>",
        "relationship": {
          "is_beneficial_owner": true,
          "is_representative": true
        }
      }
    ],
    "external_id": "<string>",
    "custom_data": {},
    "settings": {
      "net_settlement": "active"
    }
  },
  "capital_product_offer": {
    "id": "<string>",
    "business_id": "<string>",
    "business_external_id": "<string>",
    "business_parafin_id": "<string>",
    "product_type": "merchant_cash_advance",
    "active": true,
    "is_marketable": true,
    "date": "2023-12-25",
    "total_approved_amount": 123,
    "max_fee_amount": 123,
    "max_fee_discount_amount": 123,
    "max_payment_rate": 123,
    "max_fee_multiplier": 123,
    "expiration_date": "2023-12-25",
    "is_top_up": true,
    "campaign_type": "pre_approved",
    "offer_url": "<string>",
    "term_loan_offer_details": {
      "schedule": "daily",
      "fixed_amount": 123,
      "term_length_months": 123
    }
  },
  "person": {
    "id": "<string>",
    "first_name": "<string>",
    "last_name": "<string>",
    "contact_email": "<string>",
    "contact_phone": "<string>",
    "address": {
      "line1": "<string>",
      "city": "<string>",
      "state": "AL",
      "country": "<string>",
      "postal_code": "<string>",
      "line2": "<string>"
    },
    "linked_businesses": [
      "<string>"
    ],
    "custom_data": {},
    "external_id": "<string>"
  },
  "bank_account": {
    "id": "<string>",
    "business_id": "<string>",
    "routing_number": "<string>",
    "account_number": {
      "last4": "<string>",
      "full": "<string>"
    },
    "status": "new"
  }
}
```

```json
{
  "business": {
    "id": "<string>",
    "legal_name": "<string>",
    "dba_name": "<string>",
    "address": {
      "line1": "<string>",
      "city": "<string>",
      "state": "AL",
      "country": "<string>",
      "postal_code": "<string>",
      "line2": "<string>"
    },
    "established_date": "2023-12-25",
    "incorporation_state": "AL",
    "incorporation_type": "llc",
    "mcc": "<string>",
    "linked_persons": [
      {
        "id": "<string>",
        "relationship": {
          "is_beneficial_owner": true,
          "is_representative": true
        }
      }
    ],
    "external_id": "<string>",
    "custom_data": {},
    "settings": {
      "net_settlement": "active"
    }
  },
  "capital_product_offer": {
    "id": "<string>",
    "business_id": "<string>",
    "business_external_id": "<string>",
    "business_parafin_id": "<string>",
    "product_type": "merchant_cash_advance",
    "active": true,
    "is_marketable": true,
    "date": "2023-12-25",
    "total_approved_amount": 123,
    "max_fee_amount": 123,
    "max_fee_discount_amount": 123,
    "max_payment_rate": 123,
    "max_fee_multiplier": 123,
    "expiration_date": "2023-12-25",
    "is_top_up": true,
    "campaign_type": "pre_approved",
    "offer_url": "<string>",
    "term_loan_offer_details": {
      "schedule": "daily",
      "fixed_amount": 123,
      "term_length_months": 123
    }
  },
  "person": {
    "id": "<string>",
    "first_name": "<string>",
    "last_name": "<string>",
    "contact_email": "<string>",
    "contact_phone": "<string>",
    "address": {
      "line1": "<string>",
      "city": "<string>",
      "state": "AL",
      "country": "<string>",
      "postal_code": "<string>",
      "line2": "<string>"
    },
    "linked_businesses": [
      "<string>"
    ],
    "custom_data": {},
    "external_id": "<string>"
  },
  "bank_account": {
    "id": "<string>",
    "business_id": "<string>",
    "routing_number": "<string>",
    "account_number": {
      "last4": "<string>",
      "full": "<string>"
    },
    "status": "new"
  }
}
```

*Source: https://docs.parafin.com/api-reference/sandbox-generate-events/capital-product-offer-closed-sandbox*

---

## Capital Product Offer Created (Sandbox)

**POST** `/v1/sandbox/generate_event/capital_product_offer/created`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Capital Product Offer Created (Sandbox)cURLcurl --request POST \
  --url https://api.parafin.com/v1/sandbox/generate_event/capital_product_offer/created \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "business": {
    "business_external_id": "<string>",
    "legal_name": "<string>",
    "dba_name": "<string>",
    "established_date": "2023-12-25",
    "incorporation_state": "AL",
    "incorporation_type": "llc",
    "address": {
      "line1": "<string>",
      "city": "<string>",
      "state": "AL",
      "country": "<string>",
      "postal_code": "<string>",
      "line2": "<string>"
    },
    "mcc": "<string>"
  },
  "bank_account": {
    "routing_number": "<string>",
    "account_number": {
      "last4": "<string>",
      "full": "<string>"
    },
    "currency": "USD",
    "is_verified": true
  },
  "person": {
    "first_name": "<string>",
    "last_name": "<string>",
    "contact_email": "<string>",
    "contact_phone": "<string>",
    "address": {
      "line1": "<string>",
      "city": "<string>",
      "state": "AL",
      "country": "<string>",
      "postal_code": "<string>",
      "line2": "<string>"
    }
  },
  "capital_product_offer": {
    "product_type": "merchant_cash_advance",
    "max_offer_amount": 123,
    "include_fee_discount": true
  }
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/sandbox/generate_event/capital_product_offer/created \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "business": {
    "business_external_id": "<string>",
    "legal_name": "<string>",
    "dba_name": "<string>",
    "established_date": "2023-12-25",
    "incorporation_state": "AL",
    "incorporation_type": "llc",
    "address": {
      "line1": "<string>",
      "city": "<string>",
      "state": "AL",
      "country": "<string>",
      "postal_code": "<string>",
      "line2": "<string>"
    },
    "mcc": "<string>"
  },
  "bank_account": {
    "routing_number": "<string>",
    "account_number": {
      "last4": "<string>",
      "full": "<string>"
    },
    "currency": "USD",
    "is_verified": true
  },
  "person": {
    "first_name": "<string>",
    "last_name": "<string>",
    "contact_email": "<string>",
    "contact_phone": "<string>",
    "address": {
      "line1": "<string>",
      "city": "<string>",
      "state": "AL",
      "country": "<string>",
      "postal_code": "<string>",
      "line2": "<string>"
    }
  },
  "capital_product_offer": {
    "product_type": "merchant_cash_advance",
    "max_offer_amount": 123,
    "include_fee_discount": true
  }
}
'
```

```json
200400default{
  "business": {
    "id": "<string>",
    "legal_name": "<string>",
    "dba_name": "<string>",
    "address": {
      "line1": "<string>",
      "city": "<string>",
      "state": "AL",
      "country": "<string>",
      "postal_code": "<string>",
      "line2": "<string>"
    },
    "established_date": "2023-12-25",
    "incorporation_state": "AL",
    "incorporation_type": "llc",
    "mcc": "<string>",
    "linked_persons": [
      {
        "id": "<string>",
        "relationship": {
          "is_beneficial_owner": true,
          "is_representative": true
        }
      }
    ],
    "external_id": "<string>",
    "custom_data": {},
    "settings": {
      "net_settlement": "active"
    }
  },
  "capital_product_offer": {
    "id": "<string>",
    "business_id": "<string>",
    "business_external_id": "<string>",
    "business_parafin_id": "<string>",
    "product_type": "merchant_cash_advance",
    "active": true,
    "is_marketable": true,
    "date": "2023-12-25",
    "total_approved_amount": 123,
    "max_fee_amount": 123,
    "max_fee_discount_amount": 123,
    "max_payment_rate": 123,
    "max_fee_multiplier": 123,
    "expiration_date": "2023-12-25",
    "is_top_up": true,
    "campaign_type": "pre_approved",
    "offer_url": "<string>",
    "term_loan_offer_details": {
      "schedule": "daily",
      "fixed_amount": 123,
      "term_length_months": 123
    }
  },
  "person": {
    "id": "<string>",
    "first_name": "<string>",
    "last_name": "<string>",
    "contact_email": "<string>",
    "contact_phone": "<string>",
    "address": {
      "line1": "<string>",
      "city": "<string>",
      "state": "AL",
      "country": "<string>",
      "postal_code": "<string>",
      "line2": "<string>"
    },
    "linked_businesses": [
      "<string>"
    ],
    "custom_data": {},
    "external_id": "<string>"
  },
  "bank_account": {
    "id": "<string>",
    "business_id": "<string>",
    "routing_number": "<string>",
    "account_number": {
      "last4": "<string>",
      "full": "<string>"
    },
    "status": "new"
  }
}
```

```json
{
  "business": {
    "id": "<string>",
    "legal_name": "<string>",
    "dba_name": "<string>",
    "address": {
      "line1": "<string>",
      "city": "<string>",
      "state": "AL",
      "country": "<string>",
      "postal_code": "<string>",
      "line2": "<string>"
    },
    "established_date": "2023-12-25",
    "incorporation_state": "AL",
    "incorporation_type": "llc",
    "mcc": "<string>",
    "linked_persons": [
      {
        "id": "<string>",
        "relationship": {
          "is_beneficial_owner": true,
          "is_representative": true
        }
      }
    ],
    "external_id": "<string>",
    "custom_data": {},
    "settings": {
      "net_settlement": "active"
    }
  },
  "capital_product_offer": {
    "id": "<string>",
    "business_id": "<string>",
    "business_external_id": "<string>",
    "business_parafin_id": "<string>",
    "product_type": "merchant_cash_advance",
    "active": true,
    "is_marketable": true,
    "date": "2023-12-25",
    "total_approved_amount": 123,
    "max_fee_amount": 123,
    "max_fee_discount_amount": 123,
    "max_payment_rate": 123,
    "max_fee_multiplier": 123,
    "expiration_date": "2023-12-25",
    "is_top_up": true,
    "campaign_type": "pre_approved",
    "offer_url": "<string>",
    "term_loan_offer_details": {
      "schedule": "daily",
      "fixed_amount": 123,
      "term_length_months": 123
    }
  },
  "person": {
    "id": "<string>",
    "first_name": "<string>",
    "last_name": "<string>",
    "contact_email": "<string>",
    "contact_phone": "<string>",
    "address": {
      "line1": "<string>",
      "city": "<string>",
      "state": "AL",
      "country": "<string>",
      "postal_code": "<string>",
      "line2": "<string>"
    },
    "linked_businesses": [
      "<string>"
    ],
    "custom_data": {},
    "external_id": "<string>"
  },
  "bank_account": {
    "id": "<string>",
    "business_id": "<string>",
    "routing_number": "<string>",
    "account_number": {
      "last4": "<string>",
      "full": "<string>"
    },
    "status": "new"
  }
}
```

*Source: https://docs.parafin.com/api-reference/sandbox-generate-events/capital-product-offer-created-sandbox*

---

## Create Spend Card Offer (Sandbox)

**POST** `/v1/sandbox/spend_card/offer`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create Spend Card Offer (Sandbox)cURLcurl --request POST \
  --url https://api.parafin.com/v1/sandbox/spend_card/offer \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "business_parafin_id": "<string>",
  "offer_amount": 123
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/sandbox/spend_card/offer \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "business_parafin_id": "<string>",
  "offer_amount": 123
}
'
```

```json
200400default{
  "id": "<string>",
  "business_parafin_id": "<string>",
  "product_type": "bnpl",
  "amount": 123,
  "currency": "USD",
  "active": true,
  "created_at": "2023-11-07T05:31:56Z",
  "closed_at": "2023-11-07T05:31:56Z"
}
```

```json
{
  "id": "<string>",
  "business_parafin_id": "<string>",
  "product_type": "bnpl",
  "amount": 123,
  "currency": "USD",
  "active": true,
  "created_at": "2023-11-07T05:31:56Z",
  "closed_at": "2023-11-07T05:31:56Z"
}
```

*Source: https://docs.parafin.com/api-reference/spend-cards/create-spend-card-offer-sandbox*

---

## List Webhook Endpoints

**POST** `/v1/webhook_endpoints`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
List Webhook EndpointscURLcurl --request GET \
  --url https://api.parafin.com/v1/webhook_endpoints \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/webhook_endpoints \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200400default{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "url": "<string>",
      "status": "enabled",
      "enabled_events": [
        "cash_advance_offer_created"
      ]
    }
  ]
}
```

```json
{
  "has_more": true,
  "results": [
    {
      "id": "<string>",
      "url": "<string>",
      "status": "enabled",
      "enabled_events": [
        "cash_advance_offer_created"
      ]
    }
  ]
}
```

*Source: https://docs.parafin.com/api-reference/webhook-endpoints/list-webhook-endpoints*

---

## Create Webhook Endpoint

**POST** `/v1/webhook_endpoints`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Create Webhook EndpointcURLcurl --request POST \
  --url https://api.parafin.com/v1/webhook_endpoints \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "url": "<string>",
  "enabled_events": [
    "cash_advance_offer_created"
  ]
}
'
```

```bash
curl --request POST \
  --url https://api.parafin.com/v1/webhook_endpoints \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "url": "<string>",
  "enabled_events": [
    "cash_advance_offer_created"
  ]
}
'
```

```json
200400default{
  "id": "<string>",
  "url": "<string>",
  "secret": "<string>",
  "status": "enabled",
  "enabled_events": [
    "cash_advance_offer_created"
  ]
}
```

```json
{
  "id": "<string>",
  "url": "<string>",
  "secret": "<string>",
  "status": "enabled",
  "enabled_events": [
    "cash_advance_offer_created"
  ]
}
```

*Source: https://docs.parafin.com/api-reference/webhook-endpoints/create-webhook-endpoint*

---

## Get Webhook Endpoint

**POST** `/v1/webhook_endpoints/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Get Webhook EndpointcURLcurl --request GET \
  --url https://api.parafin.com/v1/webhook_endpoints/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```bash
curl --request GET \
  --url https://api.parafin.com/v1/webhook_endpoints/{id} \
  --header 'Authorization: Basic <encoded-value>'
```

```json
200default{
  "id": "<string>",
  "url": "<string>",
  "status": "enabled",
  "enabled_events": [
    "cash_advance_offer_created"
  ]
}
```

```json
{
  "id": "<string>",
  "url": "<string>",
  "status": "enabled",
  "enabled_events": [
    "cash_advance_offer_created"
  ]
}
```

*Source: https://docs.parafin.com/api-reference/webhook-endpoints/get-webhook-endpoint*

---

## Update Webhook Endpoint

**POST** `/v1/webhook_endpoints/{id}`

Basic authentication header of the form Basic <encoded-value>, where <encoded-value> is the base64-encoded string username:password.

```bash
Update Webhook EndpointcURLcurl --request PATCH \
  --url https://api.parafin.com/v1/webhook_endpoints/{id} \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "url": "<string>",
  "enabled_events": [
    "cash_advance_offer_created"
  ]
}
'
```

```bash
curl --request PATCH \
  --url https://api.parafin.com/v1/webhook_endpoints/{id} \
  --header 'Authorization: Basic <encoded-value>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "url": "<string>",
  "enabled_events": [
    "cash_advance_offer_created"
  ]
}
'
```

```json
200400default{
  "id": "<string>",
  "url": "<string>",
  "status": "enabled",
  "enabled_events": [
    "cash_advance_offer_created"
  ]
}
```

```json
{
  "id": "<string>",
  "url": "<string>",
  "status": "enabled",
  "enabled_events": [
    "cash_advance_offer_created"
  ]
}
```

*Source: https://docs.parafin.com/api-reference/webhook-endpoints/update-webhook-endpoint*

---

