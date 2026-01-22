# Product Requirements

## Commands

```yaml
commands:
  - name: balance
    purpose: Get current account balance
    options:
      - name: format
        short: f
        type: string
        description: Output format (json, table)
        default: json
        choices: [json, table]

  - name: business.get
    purpose: Get business by ID
    arguments:
      - name: business_id
        type: string
        required: true
        description: Business ID
    options:
      - name: limit
        short: l
        type: integer
        description: Limit number of results
        default: 10
      - name: offset
        short: o
        type: integer
        description: Offset for pagination
        default: 0

  - name: business.all
    purpose: Get comprehensive information about a business including offers, applications, loans, persons, and bank accounts
    arguments:
      - name: business_parafin_id
        type: string
        required: true
        description: Business Parafin ID
    options:
      - name: limit
        short: l
        type: integer
        description: Limit number of results per category
        default: 100

  - name: business.bank
    purpose: Get bank accounts for a business
    arguments:
      - name: business_id
        type: string
        required: true
        description: Business ID
    options: []

  - name: business.list
    purpose: List businesses
    options:
      - name: limit
        short: l
        type: integer
        description: Limit number of results
        default: 10
      - name: offset
        short: o
        type: integer
        description: Offset for pagination
        default: 0

  - name: business.persons
    purpose: List all people associated with a business
    arguments:
      - name: business_id
        type: string
        required: true
        description: Business ID
    options: []

  - name: capital.list
    purpose: List capital requests
    options:
      - name: status
        short: s
        type: string
        description: Filter by status
        choices: [pending, approved, rejected, completed]
      - name: limit
        short: l
        type: integer
        description: Limit number of results
        default: 10
      - name: offset
        short: o
        type: integer
        description: Offset for pagination
        default: 0

  - name: capital.offer
    purpose: Get capital product offer by ID
    arguments:
      - name: product_offer_id
        type: string
        required: true
        description: Capital product offer ID

  - name: util.generate_doc_md
    purpose: Export Parafin API documentation to README.md
    options:
      - name: output
        short: o
        type: string
        description: Output file path
        default: README.md
```
