export const treeData = [
    {
      name: "SECTOR",
      description: "Sector",
      selectionType: "MULTIPLE",
      appCode: "sp-dps-r360-dev",
      values: [
        {
          value: "Europe",
          display: "Europe",
          children: [
            {
              name: "TIMEZONE",
              description: "Timezone",
              selectionType: "SINGLE",
              values: [
                { 
                  value: "Europe/London", 
                  display: "Europe/London", 
                  children: [
                    {
                      name: "RETAILER",
                      description: "Retailer",
                      values: [
                        {
                          value: "2000001213",
                          display: "Sainsbury's",
                          children: []
                        }]
                      }
                    
                  ] 
                },
                { 
                  value: "Europe/Brussels", 
                  display: "Europe/Brussels", 
                  children: [] 
                },
              ],
            },
            {
              name: "COUNTRY",
              description: "Country",
              selectionType: "MULTIPLE",
              values: [
                {
                  value: "GB",
                  display: "GB",
                  children: [
                    {
                      name: "RETAILER",
                      description: "Retailer",
                      values: [
                        {
                          value: "2000001213",
                          display: "Sainsbury's",
                          children: [
                            {
                              name: "ROLE",
                              description: "Role",
                              values: [
                                {
                                  value: "NAM",
                                  display: "NAM",
                                  children: [
                                    {
                                      name: "DIVISION",
                                      description: "Division",
                                      values: [
                                        {
                                          value: "2000001213_snacks",
                                          display: "Snacks",
                                          children: [],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];