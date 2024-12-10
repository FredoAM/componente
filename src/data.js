export const treeData = [
  {
      "name": "SECTOR",
      "description": "Sector",
      "selectionType": "MULTIPLE",
      "appCode": "sp-dps-r360-dev",
      "values": [
          {
              "value": "Europe",
              "display": "Europe",
              "children": [
                  {
                      "name": "TIMEZONE",
                      "description": "Timezone",
                      "selectionType": "SINGLE",
                      "includeInToken": false,
                      "values": [
                          {
                              "value": "Europe/London",
                              "display": "Europe/London",
                              "children": []
                          },
                          {
                              "value": "Europe/Brussels",
                              "display": "Europe/Brussels",
                              "children": []
                          },
                          {
                              "value": "Europe/Warsaw",
                              "display": "Europe/Warsaw",
                              "children": []
                          },
                          {
                              "value": "Europe/Jersey",
                              "display": "Europe/Jersey",
                              "children": []
                          },
                          {
                              "value": "Europe/Istanbul",
                              "display": "Europe/Istanbul",
                              "children": []
                          },
                          {
                              "value": "Europe/Luxembourg",
                              "display": "Europe/Luxembourg",
                              "children": []
                          }
                      ]
                  },
                  {
                      "name": "USER_TYPE",
                      "description": "User Type",
                      "selectionType": "SINGLE",
                      "includeInToken": false,
                      "values": [
                          {
                              "value": "BUSINESS_USER",
                              "display": "Business User",
                              "children": []
                          },
                          {
                              "value": "PRODUCT_USER",
                              "display": "Product User",
                              "children": []
                          },
                          {
                              "value": "SUPPORT_USER",
                              "display": "Support User",
                              "children": []
                          }
                      ]
                  },
                  {
                      "name": "COUNTRY",
                      "description": "Country",
                      "selectionType": "MULTIPLE",
                      "includeInToken": false,
                      "values": [
                          {
                              "value": "GB",
                              "display": "GB",
                              "children": [
                                  {
                                      "name": "RETAILER",
                                      "description": "Retailer",
                                      "selectionType": "MULTIPLE",
                                      "includeInToken": true,
                                      "values": [
                                          {
                                              "value": "2000001213",
                                              "display": "Sainsbury´s",
                                              "children": [
                                                  {
                                                      "name": "ROLE",
                                                      "description": "Role",
                                                      "selectionType": "SINGLE",
                                                      "includeInToken": true,
                                                      "values": [
                                                          {
                                                              "value": "NAM",
                                                              "display": "NAM",
                                                              "children": [
                                                                  {
                                                                      "name": "DIVISION",
                                                                      "description": "Division",
                                                                      "selectionType": "MULTIPLE",
                                                                      "includeInToken": false,
                                                                      "values": [
                                                                          {
                                                                              "value": "2000001213_snacks",
                                                                              "display": "Snacks",
                                                                              "children": [
                                                                                  {
                                                                                      "name": "SUB_ASSOCIATIONS",
                                                                                      "description": "Sub Associations",
                                                                                      "selectionType": "MULTIPLE",
                                                                                      "includeInToken": false,
                                                                                      "values": [
                                                                                          {
                                                                                              "value": "2000001213_CSN",
                                                                                              "display": "CSN",
                                                                                              "children": []
                                                                                          },
                                                                                          {
                                                                                              "value": "2000001213_FTG",
                                                                                              "display": "FTG",
                                                                                              "children": []
                                                                                          },
                                                                                          {
                                                                                              "value": "2000001213_Biscuits",
                                                                                              "display": "Biscuits",
                                                                                              "children": []
                                                                                          },
                                                                                          {
                                                                                              "value": "2000001213_Other",
                                                                                              "display": "Other",
                                                                                              "children": []
                                                                                          }
                                                                                      ]
                                                                                  }
                                                                              ]
                                                                          }
                                                                      ]
                                                                  },
                                                                  {
                                                                      "name": "OWNED_DIVISIONS",
                                                                      "description": "Owned Divisions",
                                                                      "selectionType": "MULTIPLE",
                                                                      "includeInToken": false,
                                                                      "values": [
                                                                          {
                                                                              "value": "2000001213_snacks",
                                                                              "display": "Snacks",
                                                                              "children": []
                                                                          }
                                                                      ]
                                                                  }
                                                              ]
                                                          }
                                                      ]
                                                  }
                                              ]
                                          }
                                      ]
                                  }
                              ]
                          }
                      ]
                  }
              ]
          }
      ]
  }
];