
let activeTalkyBot = talkyBots.find((bot) => bot?.id === "1") //  id : need to be generic and dynamic not "1"

let activeChannels = activeTalkyBot?.attributes?.active_channels 

if (

   activeChannels?.length > 0 

   && 

   activeChannels?.filter((ch) => ch?.provider === "facebook" )?.length > 0 
      // also "facebook" need to be dynamic and generic not only facebook 
  )

{

// make isConnectedBot state to true 
  return true; 

}

else{

// make isConnectedBot state to false 
return false; 

}

let talkyBots = [
    {
        "id": "1",
        "type": "talkybot",
        "attributes": {
            "tenant_id": 1,
            "name": "shaf3i",
            "industry_field": "tech_startup",
            "image": "https://scontent-frt3-1.xx.fbcdn.net/v/t39.30808-1/cp0/p50x50/246442192_105489851925625_3785088935660012537_n.png?_nc_cat=107&ccb=1-5&_nc_sid=dbb9e7&_nc_eui2=AeFu6Jeg34-WmquD96OEYsPDVKXIyE1qaMhUpcjITWpoyH-zT1an2EYiCXxQtCQcmMZ1bZPirmISXtSII9TqcGg5&_nc_ohc=xZKcB6dJmssAX-FO8JR&_nc_oc=AQnDwqJWRri-7YkrJ8jggw2P_5LtFuNxvcV8pZjLpQTrgEmrNnErs2xwqOu0F4qTIkk&_nc_ht=scontent-frt3-1.xx&edm=AJdBtusEAAAA&oh=00_AT9zVw74w4lCuDN8rcYW4JVq5DrHJtxdyZ5ekS7B6T94gA&oe=620EB58F",
            "installed_applications": [
                {
                    "id": "1",
                    "type": "application",
                    "attributes": {
                        "name": "Bot Builder",
                        "logo": "BotBuilderApp logo",
                        "description": "BotBuilderApp description",
                        "applicationable_id": 1,
                        "applicationable_type": "BotBuilderApp",
                        "application_roles": [
                            {
                                "id": 1,
                                "name": "BOT_BUILDER_ADMIN",
                                "created_at": "2022-02-13T14:36:10.598+02:00",
                                "updated_at": "2022-02-13T14:36:10.598+02:00",
                                "application_type_id": 1
                            },
                            {
                                "id": 2,
                                "name": "BOT_BUILDER_VIEWER",
                                "created_at": "2022-02-13T14:36:10.612+02:00",
                                "updated_at": "2022-02-13T14:36:10.612+02:00",
                                "application_type_id": 1
                            }
                        ]
                    }
                },
                {
                    "id": "2",
                    "type": "application",
                    "attributes": {
                        "name": "Crm",
                        "logo": "crm logo",
                        "description": "crm description",
                        "applicationable_id": 1,
                        "applicationable_type": "CrmApp",
                        "application_roles": [
                            {
                                "id": 3,
                                "name": "CRM_ADMIN",
                                "created_at": "2022-02-13T14:36:10.626+02:00",
                                "updated_at": "2022-02-13T14:36:10.626+02:00",
                                "application_type_id": 2
                            },
                            {
                                "id": 4,
                                "name": "CRM_VIEWER",
                                "created_at": "2022-02-13T14:36:10.640+02:00",
                                "updated_at": "2022-02-13T14:36:10.640+02:00",
                                "application_type_id": 2
                            }
                        ]
                    }
                },
                {
                    "id": "3",
                    "type": "application",
                    "attributes": {
                        "name": "Conversation",
                        "logo": "conversation logo",
                        "description": "conversation description",
                        "applicationable_id": 1,
                        "applicationable_type": "ConversationsApp",
                        "application_roles": [
                            {
                                "id": 5,
                                "name": "CONVERSATION_ADMIN",
                                "created_at": "2022-02-13T14:36:10.655+02:00",
                                "updated_at": "2022-02-13T14:36:10.655+02:00",
                                "application_type_id": 3
                            },
                            {
                                "id": 6,
                                "name": "CONVERSATION_VIEWER",
                                "created_at": "2022-02-13T14:36:10.670+02:00",
                                "updated_at": "2022-02-13T14:36:10.670+02:00",
                                "application_type_id": 3
                            }
                        ]
                    }
                }
            ],
            "bot_builder_id": 1,
            "bot_roles": [
                {
                    "id": 1,
                    "name": "ADMIN",
                    "created_at": "2022-02-13T14:36:10.747+02:00",
                    "updated_at": "2022-02-13T14:36:10.747+02:00"
                },
                {
                    "id": 2,
                    "name": "CUSTOM_ROLE",
                    "created_at": "2022-02-13T14:36:10.775+02:00",
                    "updated_at": "2022-02-13T14:36:10.775+02:00"
                }
            ],
            "active_channels": [
                {
                    "channel": "Talkybot-shaf3i",
                    "provider": "facebook"
                }
            ],
            "users": [
                {
                    "id": "15",
                    "type": "user",
                    "attributes": {
                        "id": 15,
                        "email": "monika@hero.com",
                        "tenant": {
                            "id": 1,
                            "created_at": "2022-02-13T14:36:11.147+02:00",
                            "updated_at": "2022-02-13T14:36:11.147+02:00",
                            "name": "ruby",
                            "number_of_employees": "50",
                            "phone_number": null
                        },
                        "user_profile": {
                            "id": 15,
                            "created_at": "2022-02-13T14:36:14.199+02:00",
                            "updated_at": "2022-02-13T14:36:14.199+02:00",
                            "name": "Monika Nosser",
                            "user_id": 15,
                            "firstname": null,
                            "lastname": null
                        },
                        "status": "active",
                        "confirmation_token": null,
                        "tenant_role": {
                            "id": 4,
                            "name": "NORMAL_USER",
                            "created_at": "2022-02-13T14:36:10.887+02:00",
                            "updated_at": "2022-02-13T14:36:10.887+02:00"
                        },
                        "attachment_url": null,
                        "confirmed?": true,
                        "talkybots_roles": [
                            {
                                "id": "10",
                                "type": "user_bot_role",
                                "attributes": {
                                    "talkybot": {
                                        "id": 1,
                                        "name": "shaf3i",
                                        "created_at": "2022-02-13T14:37:35.343+02:00",
                                        "updated_at": "2022-02-13T14:39:59.571+02:00",
                                        "tenant_id": 1,
                                        "image": "https://scontent-frt3-1.xx.fbcdn.net/v/t39.30808-1/cp0/p50x50/246442192_105489851925625_3785088935660012537_n.png?_nc_cat=107&ccb=1-5&_nc_sid=dbb9e7&_nc_eui2=AeFu6Jeg34-WmquD96OEYsPDVKXIyE1qaMhUpcjITWpoyH-zT1an2EYiCXxQtCQcmMZ1bZPirmISXtSII9TqcGg5&_nc_ohc=xZKcB6dJmssAX-FO8JR&_nc_oc=AQnDwqJWRri-7YkrJ8jggw2P_5LtFuNxvcV8pZjLpQTrgEmrNnErs2xwqOu0F4qTIkk&_nc_ht=scontent-frt3-1.xx&edm=AJdBtusEAAAA&oh=00_AT9zVw74w4lCuDN8rcYW4JVq5DrHJtxdyZ5ekS7B6T94gA&oe=620EB58F",
                                        "industry_field": "tech_startup"
                                    },
                                    "bot_role": {
                                        "id": 1,
                                        "name": "ADMIN",
                                        "created_at": "2022-02-13T14:36:10.747+02:00",
                                        "updated_at": "2022-02-13T14:36:10.747+02:00"
                                    }
                                }
                            }
                        ],
                        "talkybots_number": 1
                    }
                },
                {
                    "id": "13",
                    "type": "user",
                    "attributes": {
                        "id": 13,
                        "email": "amr@hero.com",
                        "tenant": {
                            "id": 1,
                            "created_at": "2022-02-13T14:36:11.147+02:00",
                            "updated_at": "2022-02-13T14:36:11.147+02:00",
                            "name": "ruby",
                            "number_of_employees": "50",
                            "phone_number": null
                        },
                        "user_profile": {
                            "id": 13,
                            "created_at": "2022-02-13T14:36:13.770+02:00",
                            "updated_at": "2022-02-13T14:36:13.770+02:00",
                            "name": "Amr Yasser",
                            "user_id": 13,
                            "firstname": null,
                            "lastname": null
                        },
                        "status": "active",
                        "confirmation_token": null,
                        "tenant_role": {
                            "id": 4,
                            "name": "NORMAL_USER",
                            "created_at": "2022-02-13T14:36:10.887+02:00",
                            "updated_at": "2022-02-13T14:36:10.887+02:00"
                        },
                        "attachment_url": null,
                        "confirmed?": true,
                        "talkybots_roles": [
                            {
                                "id": "11",
                                "type": "user_bot_role",
                                "attributes": {
                                    "talkybot": {
                                        "id": 1,
                                        "name": "shaf3i",
                                        "created_at": "2022-02-13T14:37:35.343+02:00",
                                        "updated_at": "2022-02-13T14:39:59.571+02:00",
                                        "tenant_id": 1,
                                        "image": "https://scontent-frt3-1.xx.fbcdn.net/v/t39.30808-1/cp0/p50x50/246442192_105489851925625_3785088935660012537_n.png?_nc_cat=107&ccb=1-5&_nc_sid=dbb9e7&_nc_eui2=AeFu6Jeg34-WmquD96OEYsPDVKXIyE1qaMhUpcjITWpoyH-zT1an2EYiCXxQtCQcmMZ1bZPirmISXtSII9TqcGg5&_nc_ohc=xZKcB6dJmssAX-FO8JR&_nc_oc=AQnDwqJWRri-7YkrJ8jggw2P_5LtFuNxvcV8pZjLpQTrgEmrNnErs2xwqOu0F4qTIkk&_nc_ht=scontent-frt3-1.xx&edm=AJdBtusEAAAA&oh=00_AT9zVw74w4lCuDN8rcYW4JVq5DrHJtxdyZ5ekS7B6T94gA&oe=620EB58F",
                                        "industry_field": "tech_startup"
                                    },
                                    "bot_role": {
                                        "id": 1,
                                        "name": "ADMIN",
                                        "created_at": "2022-02-13T14:36:10.747+02:00",
                                        "updated_at": "2022-02-13T14:36:10.747+02:00"
                                    }
                                }
                            }
                        ],
                        "talkybots_number": 1
                    }
                }
            ],
            "variations_number": 1,
            "engagements_number": 4
        }
    },
    {
        "id": "4",
        "type": "talkybot",
        "attributes": {
            "tenant_id": 1,
            "name": "greeting",
            "industry_field": "tech_startup",
            "image": null,
            "installed_applications": [
                {
                    "id": "9",
                    "type": "application",
                    "attributes": {
                        "name": "Bot Builder",
                        "logo": "BotBuilderApp logo",
                        "description": "BotBuilderApp description",
                        "applicationable_id": 4,
                        "applicationable_type": "BotBuilderApp",
                        "application_roles": [
                            {
                                "id": 1,
                                "name": "BOT_BUILDER_ADMIN",
                                "created_at": "2022-02-13T14:36:10.598+02:00",
                                "updated_at": "2022-02-13T14:36:10.598+02:00",
                                "application_type_id": 1
                            },
                            {
                                "id": 2,
                                "name": "BOT_BUILDER_VIEWER",
                                "created_at": "2022-02-13T14:36:10.612+02:00",
                                "updated_at": "2022-02-13T14:36:10.612+02:00",
                                "application_type_id": 1
                            }
                        ]
                    }
                },
                {
                    "id": "10",
                    "type": "application",
                    "attributes": {
                        "name": "Crm",
                        "logo": "crm logo",
                        "description": "crm description",
                        "applicationable_id": 4,
                        "applicationable_type": "CrmApp",
                        "application_roles": [
                            {
                                "id": 3,
                                "name": "CRM_ADMIN",
                                "created_at": "2022-02-13T14:36:10.626+02:00",
                                "updated_at": "2022-02-13T14:36:10.626+02:00",
                                "application_type_id": 2
                            },
                            {
                                "id": 4,
                                "name": "CRM_VIEWER",
                                "created_at": "2022-02-13T14:36:10.640+02:00",
                                "updated_at": "2022-02-13T14:36:10.640+02:00",
                                "application_type_id": 2
                            }
                        ]
                    }
                },
                {
                    "id": "11",
                    "type": "application",
                    "attributes": {
                        "name": "Conversation",
                        "logo": "conversation logo",
                        "description": "conversation description",
                        "applicationable_id": 3,
                        "applicationable_type": "ConversationsApp",
                        "application_roles": [
                            {
                                "id": 5,
                                "name": "CONVERSATION_ADMIN",
                                "created_at": "2022-02-13T14:36:10.655+02:00",
                                "updated_at": "2022-02-13T14:36:10.655+02:00",
                                "application_type_id": 3
                            },
                            {
                                "id": 6,
                                "name": "CONVERSATION_VIEWER",
                                "created_at": "2022-02-13T14:36:10.670+02:00",
                                "updated_at": "2022-02-13T14:36:10.670+02:00",
                                "application_type_id": 3
                            }
                        ]
                    }
                }
            ],
            "bot_builder_id": 4,
            "bot_roles": [
                {
                    "id": 1,
                    "name": "ADMIN",
                    "created_at": "2022-02-13T14:36:10.747+02:00",
                    "updated_at": "2022-02-13T14:36:10.747+02:00"
                },
                {
                    "id": 2,
                    "name": "CUSTOM_ROLE",
                    "created_at": "2022-02-13T14:36:10.775+02:00",
                    "updated_at": "2022-02-13T14:36:10.775+02:00"
                }
            ],
            "active_channels": [],
            "users": [
                {
                    "id": "20",
                    "type": "user",
                    "attributes": {
                        "id": 20,
                        "email": "mohamad.zahran@umbrasys.com",
                        "tenant": {
                            "id": 1,
                            "created_at": "2022-02-13T14:36:11.147+02:00",
                            "updated_at": "2022-02-13T14:36:11.147+02:00",
                            "name": "ruby",
                            "number_of_employees": "50",
                            "phone_number": null
                        },
                        "user_profile": {
                            "id": 20,
                            "created_at": "2022-02-14T13:32:54.268+02:00",
                            "updated_at": "2022-02-15T14:50:43.360+02:00",
                            "name": "Mohamed Zahrann",
                            "user_id": 20,
                            "firstname": null,
                            "lastname": null
                        },
                        "status": "active",
                        "confirmation_token": "kzgnG8eCZS8VE4enGzh1",
                        "tenant_role": {
                            "id": 4,
                            "name": "NORMAL_USER",
                            "created_at": "2022-02-13T14:36:10.887+02:00",
                            "updated_at": "2022-02-13T14:36:10.887+02:00"
                        },
                        "attachment_url": null,
                        "confirmed?": true,
                        "talkybots_roles": [
                            {
                                "id": "7",
                                "type": "user_bot_role",
                                "attributes": {
                                    "talkybot": {
                                        "id": 4,
                                        "name": "greeting",
                                        "created_at": "2022-02-14T11:44:34.596+02:00",
                                        "updated_at": "2022-02-14T11:44:34.596+02:00",
                                        "tenant_id": 1,
                                        "image": null,
                                        "industry_field": "tech_startup"
                                    },
                                    "bot_role": {
                                        "id": 1,
                                        "name": "ADMIN",
                                        "created_at": "2022-02-13T14:36:10.747+02:00",
                                        "updated_at": "2022-02-13T14:36:10.747+02:00"
                                    }
                                }
                            },
                            {
                                "id": "8",
                                "type": "user_bot_role",
                                "attributes": {
                                    "talkybot": {
                                        "id": 6,
                                        "name": "Zahran Bot",
                                        "created_at": "2022-02-14T13:19:07.796+02:00",
                                        "updated_at": "2022-02-15T10:49:13.719+02:00",
                                        "tenant_id": 1,
                                        "image": "https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-1/203109500_100216322321402_7181713205966523702_n.png?stp=cp0_dst-png_p50x50&_nc_cat=104&ccb=1-5&_nc_sid=dbb9e7&_nc_eui2=AeGfu0w8DQco1UfW1R09xOsydkE8BeYzLCF2QTwF5jMsIRnAT-d__lZwWz1CS9EtgznaN466nkqE4vmq1RHSVgda&_nc_ohc=VxagxVw5RX0AX-1DPTl&_nc_ht=scontent-frt3-1.xx&edm=AJdBtusEAAAA&oh=00_AT9PoLD5JB86iwnEICunBcG0VREbSCVNWKah7twFzMGUGA&oe=62305D3F",
                                        "industry_field": "tech_startup"
                                    },
                                    "bot_role": {
                                        "id": 1,
                                        "name": "ADMIN",
                                        "created_at": "2022-02-13T14:36:10.747+02:00",
                                        "updated_at": "2022-02-13T14:36:10.747+02:00"
                                    }
                                }
                            },
                            {
                                "id": "9",
                                "type": "user_bot_role",
                                "attributes": {
                                    "talkybot": {
                                        "id": 7,
                                        "name": "test 14-2",
                                        "created_at": "2022-02-14T13:25:00.611+02:00",
                                        "updated_at": "2022-02-14T13:25:18.249+02:00",
                                        "tenant_id": 1,
                                        "image": "https://scontent-frx5-1.xx.fbcdn.net/v/t39.30808-1/cp0/p50x50/241020302_101699215587443_5148200489553708181_n.png?_nc_cat=111&ccb=1-5&_nc_sid=dbb9e7&_nc_eui2=AeEKHgHjC42CNigca1qQXmqdX3WIr5TP4S5fdYivlM_hLp7GD8f7acF0VoCqoEuF3RR7RXHyc3G3dYv2-RF5zPbC&_nc_ohc=m2rtwBVAOIkAX_wMfbb&_nc_ht=scontent-frx5-1.xx&edm=AJdBtusEAAAA&oh=00_AT8DZ5dNaIgQmmSDpy-3NJ6dyJOAagIpNZ9UiyhtK-dymA&oe=620FE097",
                                        "industry_field": "software_app_development"
                                    },
                                    "bot_role": {
                                        "id": 1,
                                        "name": "ADMIN",
                                        "created_at": "2022-02-13T14:36:10.747+02:00",
                                        "updated_at": "2022-02-13T14:36:10.747+02:00"
                                    }
                                }
                            }
                        ],
                        "talkybots_number": 3
                    }
                }
            ],
            "variations_number": 0,
            "engagements_number": 0
        }
    },
    {
        "id": "6",
        "type": "talkybot",
        "attributes": {
            "tenant_id": 1,
            "name": "Zahran Bot",
            "industry_field": "tech_startup",
            "image": "https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-1/203109500_100216322321402_7181713205966523702_n.png?stp=cp0_dst-png_p50x50&_nc_cat=104&ccb=1-5&_nc_sid=dbb9e7&_nc_eui2=AeGfu0w8DQco1UfW1R09xOsydkE8BeYzLCF2QTwF5jMsIRnAT-d__lZwWz1CS9EtgznaN466nkqE4vmq1RHSVgda&_nc_ohc=VxagxVw5RX0AX-1DPTl&_nc_ht=scontent-frt3-1.xx&edm=AJdBtusEAAAA&oh=00_AT9PoLD5JB86iwnEICunBcG0VREbSCVNWKah7twFzMGUGA&oe=62305D3F",
            "installed_applications": [
                {
                    "id": "14",
                    "type": "application",
                    "attributes": {
                        "name": "Bot Builder",
                        "logo": "BotBuilderApp logo",
                        "description": "BotBuilderApp description",
                        "applicationable_id": 6,
                        "applicationable_type": "BotBuilderApp",
                        "application_roles": [
                            {
                                "id": 1,
                                "name": "BOT_BUILDER_ADMIN",
                                "created_at": "2022-02-13T14:36:10.598+02:00",
                                "updated_at": "2022-02-13T14:36:10.598+02:00",
                                "application_type_id": 1
                            },
                            {
                                "id": 2,
                                "name": "BOT_BUILDER_VIEWER",
                                "created_at": "2022-02-13T14:36:10.612+02:00",
                                "updated_at": "2022-02-13T14:36:10.612+02:00",
                                "application_type_id": 1
                            }
                        ]
                    }
                },
                {
                    "id": "15",
                    "type": "application",
                    "attributes": {
                        "name": "Crm",
                        "logo": "crm logo",
                        "description": "crm description",
                        "applicationable_id": 6,
                        "applicationable_type": "CrmApp",
                        "application_roles": [
                            {
                                "id": 3,
                                "name": "CRM_ADMIN",
                                "created_at": "2022-02-13T14:36:10.626+02:00",
                                "updated_at": "2022-02-13T14:36:10.626+02:00",
                                "application_type_id": 2
                            },
                            {
                                "id": 4,
                                "name": "CRM_VIEWER",
                                "created_at": "2022-02-13T14:36:10.640+02:00",
                                "updated_at": "2022-02-13T14:36:10.640+02:00",
                                "application_type_id": 2
                            }
                        ]
                    }
                },
                {
                    "id": "19",
                    "type": "application",
                    "attributes": {
                        "name": "Conversation",
                        "logo": "conversation logo",
                        "description": "conversation description",
                        "applicationable_id": 5,
                        "applicationable_type": "ConversationsApp",
                        "application_roles": [
                            {
                                "id": 5,
                                "name": "CONVERSATION_ADMIN",
                                "created_at": "2022-02-13T14:36:10.655+02:00",
                                "updated_at": "2022-02-13T14:36:10.655+02:00",
                                "application_type_id": 3
                            },
                            {
                                "id": 6,
                                "name": "CONVERSATION_VIEWER",
                                "created_at": "2022-02-13T14:36:10.670+02:00",
                                "updated_at": "2022-02-13T14:36:10.670+02:00",
                                "application_type_id": 3
                            }
                        ]
                    }
                }
            ],
            "bot_builder_id": 6,
            "bot_roles": [
                {
                    "id": 1,
                    "name": "ADMIN",
                    "created_at": "2022-02-13T14:36:10.747+02:00",
                    "updated_at": "2022-02-13T14:36:10.747+02:00"
                },
                {
                    "id": 2,
                    "name": "CUSTOM_ROLE",
                    "created_at": "2022-02-13T14:36:10.775+02:00",
                    "updated_at": "2022-02-13T14:36:10.775+02:00"
                }
            ],
            "active_channels": [
                {
                    "channel": "Restaurants - مطاعم",
                    "provider": "facebook"
                }
            ],
            "users": [
                {
                    "id": "20",
                    "type": "user",
                    "attributes": {
                        "id": 20,
                        "email": "mohamad.zahran@umbrasys.com",
                        "tenant": {
                            "id": 1,
                            "created_at": "2022-02-13T14:36:11.147+02:00",
                            "updated_at": "2022-02-13T14:36:11.147+02:00",
                            "name": "ruby",
                            "number_of_employees": "50",
                            "phone_number": null
                        },
                        "user_profile": {
                            "id": 20,
                            "created_at": "2022-02-14T13:32:54.268+02:00",
                            "updated_at": "2022-02-15T14:50:43.360+02:00",
                            "name": "Mohamed Zahrann",
                            "user_id": 20,
                            "firstname": null,
                            "lastname": null
                        },
                        "status": "active",
                        "confirmation_token": "kzgnG8eCZS8VE4enGzh1",
                        "tenant_role": {
                            "id": 4,
                            "name": "NORMAL_USER",
                            "created_at": "2022-02-13T14:36:10.887+02:00",
                            "updated_at": "2022-02-13T14:36:10.887+02:00"
                        },
                        "attachment_url": null,
                        "confirmed?": true,
                        "talkybots_roles": [
                            {
                                "id": "7",
                                "type": "user_bot_role",
                                "attributes": {
                                    "talkybot": {
                                        "id": 4,
                                        "name": "greeting",
                                        "created_at": "2022-02-14T11:44:34.596+02:00",
                                        "updated_at": "2022-02-14T11:44:34.596+02:00",
                                        "tenant_id": 1,
                                        "image": null,
                                        "industry_field": "tech_startup"
                                    },
                                    "bot_role": {
                                        "id": 1,
                                        "name": "ADMIN",
                                        "created_at": "2022-02-13T14:36:10.747+02:00",
                                        "updated_at": "2022-02-13T14:36:10.747+02:00"
                                    }
                                }
                            },
                            {
                                "id": "8",
                                "type": "user_bot_role",
                                "attributes": {
                                    "talkybot": {
                                        "id": 6,
                                        "name": "Zahran Bot",
                                        "created_at": "2022-02-14T13:19:07.796+02:00",
                                        "updated_at": "2022-02-15T10:49:13.719+02:00",
                                        "tenant_id": 1,
                                        "image": "https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-1/203109500_100216322321402_7181713205966523702_n.png?stp=cp0_dst-png_p50x50&_nc_cat=104&ccb=1-5&_nc_sid=dbb9e7&_nc_eui2=AeGfu0w8DQco1UfW1R09xOsydkE8BeYzLCF2QTwF5jMsIRnAT-d__lZwWz1CS9EtgznaN466nkqE4vmq1RHSVgda&_nc_ohc=VxagxVw5RX0AX-1DPTl&_nc_ht=scontent-frt3-1.xx&edm=AJdBtusEAAAA&oh=00_AT9PoLD5JB86iwnEICunBcG0VREbSCVNWKah7twFzMGUGA&oe=62305D3F",
                                        "industry_field": "tech_startup"
                                    },
                                    "bot_role": {
                                        "id": 1,
                                        "name": "ADMIN",
                                        "created_at": "2022-02-13T14:36:10.747+02:00",
                                        "updated_at": "2022-02-13T14:36:10.747+02:00"
                                    }
                                }
                            },
                            {
                                "id": "9",
                                "type": "user_bot_role",
                                "attributes": {
                                    "talkybot": {
                                        "id": 7,
                                        "name": "test 14-2",
                                        "created_at": "2022-02-14T13:25:00.611+02:00",
                                        "updated_at": "2022-02-14T13:25:18.249+02:00",
                                        "tenant_id": 1,
                                        "image": "https://scontent-frx5-1.xx.fbcdn.net/v/t39.30808-1/cp0/p50x50/241020302_101699215587443_5148200489553708181_n.png?_nc_cat=111&ccb=1-5&_nc_sid=dbb9e7&_nc_eui2=AeEKHgHjC42CNigca1qQXmqdX3WIr5TP4S5fdYivlM_hLp7GD8f7acF0VoCqoEuF3RR7RXHyc3G3dYv2-RF5zPbC&_nc_ohc=m2rtwBVAOIkAX_wMfbb&_nc_ht=scontent-frx5-1.xx&edm=AJdBtusEAAAA&oh=00_AT8DZ5dNaIgQmmSDpy-3NJ6dyJOAagIpNZ9UiyhtK-dymA&oe=620FE097",
                                        "industry_field": "software_app_development"
                                    },
                                    "bot_role": {
                                        "id": 1,
                                        "name": "ADMIN",
                                        "created_at": "2022-02-13T14:36:10.747+02:00",
                                        "updated_at": "2022-02-13T14:36:10.747+02:00"
                                    }
                                }
                            }
                        ],
                        "talkybots_number": 3
                    }
                }
            ],
            "variations_number": 3,
            "engagements_number": 2
        }
    },
    {
        "id": "7",
        "type": "talkybot",
        "attributes": {
            "tenant_id": 1,
            "name": "test 14-2",
            "industry_field": "software_app_development",
            "image": "https://scontent-frx5-1.xx.fbcdn.net/v/t39.30808-1/cp0/p50x50/241020302_101699215587443_5148200489553708181_n.png?_nc_cat=111&ccb=1-5&_nc_sid=dbb9e7&_nc_eui2=AeEKHgHjC42CNigca1qQXmqdX3WIr5TP4S5fdYivlM_hLp7GD8f7acF0VoCqoEuF3RR7RXHyc3G3dYv2-RF5zPbC&_nc_ohc=m2rtwBVAOIkAX_wMfbb&_nc_ht=scontent-frx5-1.xx&edm=AJdBtusEAAAA&oh=00_AT8DZ5dNaIgQmmSDpy-3NJ6dyJOAagIpNZ9UiyhtK-dymA&oe=620FE097",
            "installed_applications": [
                {
                    "id": "16",
                    "type": "application",
                    "attributes": {
                        "name": "Bot Builder",
                        "logo": "BotBuilderApp logo",
                        "description": "BotBuilderApp description",
                        "applicationable_id": 7,
                        "applicationable_type": "BotBuilderApp",
                        "application_roles": [
                            {
                                "id": 1,
                                "name": "BOT_BUILDER_ADMIN",
                                "created_at": "2022-02-13T14:36:10.598+02:00",
                                "updated_at": "2022-02-13T14:36:10.598+02:00",
                                "application_type_id": 1
                            },
                            {
                                "id": 2,
                                "name": "BOT_BUILDER_VIEWER",
                                "created_at": "2022-02-13T14:36:10.612+02:00",
                                "updated_at": "2022-02-13T14:36:10.612+02:00",
                                "application_type_id": 1
                            }
                        ]
                    }
                },
                {
                    "id": "17",
                    "type": "application",
                    "attributes": {
                        "name": "Crm",
                        "logo": "crm logo",
                        "description": "crm description",
                        "applicationable_id": 7,
                        "applicationable_type": "CrmApp",
                        "application_roles": [
                            {
                                "id": 3,
                                "name": "CRM_ADMIN",
                                "created_at": "2022-02-13T14:36:10.626+02:00",
                                "updated_at": "2022-02-13T14:36:10.626+02:00",
                                "application_type_id": 2
                            },
                            {
                                "id": 4,
                                "name": "CRM_VIEWER",
                                "created_at": "2022-02-13T14:36:10.640+02:00",
                                "updated_at": "2022-02-13T14:36:10.640+02:00",
                                "application_type_id": 2
                            }
                        ]
                    }
                },
                {
                    "id": "18",
                    "type": "application",
                    "attributes": {
                        "name": "Conversation",
                        "logo": "conversation logo",
                        "description": "conversation description",
                        "applicationable_id": 4,
                        "applicationable_type": "ConversationsApp",
                        "application_roles": [
                            {
                                "id": 5,
                                "name": "CONVERSATION_ADMIN",
                                "created_at": "2022-02-13T14:36:10.655+02:00",
                                "updated_at": "2022-02-13T14:36:10.655+02:00",
                                "application_type_id": 3
                            },
                            {
                                "id": 6,
                                "name": "CONVERSATION_VIEWER",
                                "created_at": "2022-02-13T14:36:10.670+02:00",
                                "updated_at": "2022-02-13T14:36:10.670+02:00",
                                "application_type_id": 3
                            }
                        ]
                    }
                }
            ],
            "bot_builder_id": 7,
            "bot_roles": [
                {
                    "id": 1,
                    "name": "ADMIN",
                    "created_at": "2022-02-13T14:36:10.747+02:00",
                    "updated_at": "2022-02-13T14:36:10.747+02:00"
                },
                {
                    "id": 2,
                    "name": "CUSTOM_ROLE",
                    "created_at": "2022-02-13T14:36:10.775+02:00",
                    "updated_at": "2022-02-13T14:36:10.775+02:00"
                }
            ],
            "active_channels": [
                {
                    "channel": "Development",
                    "provider": "facebook"
                }
            ],
            "users": [
                {
                    "id": "20",
                    "type": "user",
                    "attributes": {
                        "id": 20,
                        "email": "mohamad.zahran@umbrasys.com",
                        "tenant": {
                            "id": 1,
                            "created_at": "2022-02-13T14:36:11.147+02:00",
                            "updated_at": "2022-02-13T14:36:11.147+02:00",
                            "name": "ruby",
                            "number_of_employees": "50",
                            "phone_number": null
                        },
                        "user_profile": {
                            "id": 20,
                            "created_at": "2022-02-14T13:32:54.268+02:00",
                            "updated_at": "2022-02-15T14:50:43.360+02:00",
                            "name": "Mohamed Zahrann",
                            "user_id": 20,
                            "firstname": null,
                            "lastname": null
                        },
                        "status": "active",
                        "confirmation_token": "kzgnG8eCZS8VE4enGzh1",
                        "tenant_role": {
                            "id": 4,
                            "name": "NORMAL_USER",
                            "created_at": "2022-02-13T14:36:10.887+02:00",
                            "updated_at": "2022-02-13T14:36:10.887+02:00"
                        },
                        "attachment_url": null,
                        "confirmed?": true,
                        "talkybots_roles": [
                            {
                                "id": "7",
                                "type": "user_bot_role",
                                "attributes": {
                                    "talkybot": {
                                        "id": 4,
                                        "name": "greeting",
                                        "created_at": "2022-02-14T11:44:34.596+02:00",
                                        "updated_at": "2022-02-14T11:44:34.596+02:00",
                                        "tenant_id": 1,
                                        "image": null,
                                        "industry_field": "tech_startup"
                                    },
                                    "bot_role": {
                                        "id": 1,
                                        "name": "ADMIN",
                                        "created_at": "2022-02-13T14:36:10.747+02:00",
                                        "updated_at": "2022-02-13T14:36:10.747+02:00"
                                    }
                                }
                            },
                            {
                                "id": "8",
                                "type": "user_bot_role",
                                "attributes": {
                                    "talkybot": {
                                        "id": 6,
                                        "name": "Zahran Bot",
                                        "created_at": "2022-02-14T13:19:07.796+02:00",
                                        "updated_at": "2022-02-15T10:49:13.719+02:00",
                                        "tenant_id": 1,
                                        "image": "https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-1/203109500_100216322321402_7181713205966523702_n.png?stp=cp0_dst-png_p50x50&_nc_cat=104&ccb=1-5&_nc_sid=dbb9e7&_nc_eui2=AeGfu0w8DQco1UfW1R09xOsydkE8BeYzLCF2QTwF5jMsIRnAT-d__lZwWz1CS9EtgznaN466nkqE4vmq1RHSVgda&_nc_ohc=VxagxVw5RX0AX-1DPTl&_nc_ht=scontent-frt3-1.xx&edm=AJdBtusEAAAA&oh=00_AT9PoLD5JB86iwnEICunBcG0VREbSCVNWKah7twFzMGUGA&oe=62305D3F",
                                        "industry_field": "tech_startup"
                                    },
                                    "bot_role": {
                                        "id": 1,
                                        "name": "ADMIN",
                                        "created_at": "2022-02-13T14:36:10.747+02:00",
                                        "updated_at": "2022-02-13T14:36:10.747+02:00"
                                    }
                                }
                            },
                            {
                                "id": "9",
                                "type": "user_bot_role",
                                "attributes": {
                                    "talkybot": {
                                        "id": 7,
                                        "name": "test 14-2",
                                        "created_at": "2022-02-14T13:25:00.611+02:00",
                                        "updated_at": "2022-02-14T13:25:18.249+02:00",
                                        "tenant_id": 1,
                                        "image": "https://scontent-frx5-1.xx.fbcdn.net/v/t39.30808-1/cp0/p50x50/241020302_101699215587443_5148200489553708181_n.png?_nc_cat=111&ccb=1-5&_nc_sid=dbb9e7&_nc_eui2=AeEKHgHjC42CNigca1qQXmqdX3WIr5TP4S5fdYivlM_hLp7GD8f7acF0VoCqoEuF3RR7RXHyc3G3dYv2-RF5zPbC&_nc_ohc=m2rtwBVAOIkAX_wMfbb&_nc_ht=scontent-frx5-1.xx&edm=AJdBtusEAAAA&oh=00_AT8DZ5dNaIgQmmSDpy-3NJ6dyJOAagIpNZ9UiyhtK-dymA&oe=620FE097",
                                        "industry_field": "software_app_development"
                                    },
                                    "bot_role": {
                                        "id": 1,
                                        "name": "ADMIN",
                                        "created_at": "2022-02-13T14:36:10.747+02:00",
                                        "updated_at": "2022-02-13T14:36:10.747+02:00"
                                    }
                                }
                            }
                        ],
                        "talkybots_number": 3
                    }
                }
            ],
            "variations_number": 0,
            "engagements_number": 2
        }
    },
    {
        "id": "9",
        "type": "talkybot",
        "attributes": {
            "tenant_id": 1,
            "name": "foushware",
            "industry_field": "tech_startup",
            "image": null,
            "installed_applications": [
                {
                    "id": "23",
                    "type": "application",
                    "attributes": {
                        "name": "Bot Builder",
                        "logo": "BotBuilderApp logo",
                        "description": "BotBuilderApp description",
                        "applicationable_id": 9,
                        "applicationable_type": "BotBuilderApp",
                        "application_roles": [
                            {
                                "id": 1,
                                "name": "BOT_BUILDER_ADMIN",
                                "created_at": "2022-02-13T14:36:10.598+02:00",
                                "updated_at": "2022-02-13T14:36:10.598+02:00",
                                "application_type_id": 1
                            },
                            {
                                "id": 2,
                                "name": "BOT_BUILDER_VIEWER",
                                "created_at": "2022-02-13T14:36:10.612+02:00",
                                "updated_at": "2022-02-13T14:36:10.612+02:00",
                                "application_type_id": 1
                            }
                        ]
                    }
                },
                {
                    "id": "24",
                    "type": "application",
                    "attributes": {
                        "name": "Crm",
                        "logo": "crm logo",
                        "description": "crm description",
                        "applicationable_id": 9,
                        "applicationable_type": "CrmApp",
                        "application_roles": [
                            {
                                "id": 3,
                                "name": "CRM_ADMIN",
                                "created_at": "2022-02-13T14:36:10.626+02:00",
                                "updated_at": "2022-02-13T14:36:10.626+02:00",
                                "application_type_id": 2
                            },
                            {
                                "id": 4,
                                "name": "CRM_VIEWER",
                                "created_at": "2022-02-13T14:36:10.640+02:00",
                                "updated_at": "2022-02-13T14:36:10.640+02:00",
                                "application_type_id": 2
                            }
                        ]
                    }
                }
            ],
            "bot_builder_id": 9,
            "bot_roles": [
                {
                    "id": 1,
                    "name": "ADMIN",
                    "created_at": "2022-02-13T14:36:10.747+02:00",
                    "updated_at": "2022-02-13T14:36:10.747+02:00"
                },
                {
                    "id": 2,
                    "name": "CUSTOM_ROLE",
                    "created_at": "2022-02-13T14:36:10.775+02:00",
                    "updated_at": "2022-02-13T14:36:10.775+02:00"
                }
            ],
            "active_channels": [],
            "users": [],
            "variations_number": 2,
            "engagements_number": 0
        }
    },
    {
        "id": "10",
        "type": "talkybot",
        "attributes": {
            "tenant_id": 1,
            "name": "Mobile",
            "industry_field": "software_app_development",
            "image": "https://scontent-frt3-1.xx.fbcdn.net/v/t39.30808-1/cp0/p50x50/246178056_101121562369912_5858359195214839628_n.png?_nc_cat=107&ccb=1-5&_nc_sid=dbb9e7&_nc_eui2=AeG0TRMVUxZNWCqsfliRy_pZVFiARAQtShlUWIBEBC1KGaqzt8ZJYttPYz2hFPrxjlXxIVk3plqBnaoGiZh731QC&_nc_ohc=d-IWS60lQAoAX9c-SoN&_nc_ht=scontent-frt3-1.xx&edm=AJdBtusEAAAA&oh=00_AT_jxq9mC2T-eLmmamgOf0HPqUhMl9zbV1AwCAesP3pgxg&oe=620DBCD3",
            "installed_applications": [
                {
                    "id": "25",
                    "type": "application",
                    "attributes": {
                        "name": "Bot Builder",
                        "logo": "BotBuilderApp logo",
                        "description": "BotBuilderApp description",
                        "applicationable_id": 10,
                        "applicationable_type": "BotBuilderApp",
                        "application_roles": [
                            {
                                "id": 1,
                                "name": "BOT_BUILDER_ADMIN",
                                "created_at": "2022-02-13T14:36:10.598+02:00",
                                "updated_at": "2022-02-13T14:36:10.598+02:00",
                                "application_type_id": 1
                            },
                            {
                                "id": 2,
                                "name": "BOT_BUILDER_VIEWER",
                                "created_at": "2022-02-13T14:36:10.612+02:00",
                                "updated_at": "2022-02-13T14:36:10.612+02:00",
                                "application_type_id": 1
                            }
                        ]
                    }
                },
                {
                    "id": "26",
                    "type": "application",
                    "attributes": {
                        "name": "Crm",
                        "logo": "crm logo",
                        "description": "crm description",
                        "applicationable_id": 10,
                        "applicationable_type": "CrmApp",
                        "application_roles": [
                            {
                                "id": 3,
                                "name": "CRM_ADMIN",
                                "created_at": "2022-02-13T14:36:10.626+02:00",
                                "updated_at": "2022-02-13T14:36:10.626+02:00",
                                "application_type_id": 2
                            },
                            {
                                "id": 4,
                                "name": "CRM_VIEWER",
                                "created_at": "2022-02-13T14:36:10.640+02:00",
                                "updated_at": "2022-02-13T14:36:10.640+02:00",
                                "application_type_id": 2
                            }
                        ]
                    }
                },
                {
                    "id": "27",
                    "type": "application",
                    "attributes": {
                        "name": "Conversation",
                        "logo": "conversation logo",
                        "description": "conversation description",
                        "applicationable_id": 7,
                        "applicationable_type": "ConversationsApp",
                        "application_roles": [
                            {
                                "id": 5,
                                "name": "CONVERSATION_ADMIN",
                                "created_at": "2022-02-13T14:36:10.655+02:00",
                                "updated_at": "2022-02-13T14:36:10.655+02:00",
                                "application_type_id": 3
                            },
                            {
                                "id": 6,
                                "name": "CONVERSATION_VIEWER",
                                "created_at": "2022-02-13T14:36:10.670+02:00",
                                "updated_at": "2022-02-13T14:36:10.670+02:00",
                                "application_type_id": 3
                            }
                        ]
                    }
                }
            ],
            "bot_builder_id": 10,
            "bot_roles": [
                {
                    "id": 1,
                    "name": "ADMIN",
                    "created_at": "2022-02-13T14:36:10.747+02:00",
                    "updated_at": "2022-02-13T14:36:10.747+02:00"
                },
                {
                    "id": 2,
                    "name": "CUSTOM_ROLE",
                    "created_at": "2022-02-13T14:36:10.775+02:00",
                    "updated_at": "2022-02-13T14:36:10.775+02:00"
                }
            ],
            "active_channels": [
                {
                    "channel": "Ibra page",
                    "provider": "facebook"
                }
            ],
            "users": [],
            "variations_number": 0,
            "engagements_number": 1
        }
    },
    {
        "id": "11",
        "type": "talkybot",
        "attributes": {
            "tenant_id": 1,
            "name": "foushware2",
            "industry_field": "financial_or_credit_services",
            "image": null,
            "installed_applications": [
                {
                    "id": "28",
                    "type": "application",
                    "attributes": {
                        "name": "Bot Builder",
                        "logo": "BotBuilderApp logo",
                        "description": "BotBuilderApp description",
                        "applicationable_id": 11,
                        "applicationable_type": "BotBuilderApp",
                        "application_roles": [
                            {
                                "id": 1,
                                "name": "BOT_BUILDER_ADMIN",
                                "created_at": "2022-02-13T14:36:10.598+02:00",
                                "updated_at": "2022-02-13T14:36:10.598+02:00",
                                "application_type_id": 1
                            },
                            {
                                "id": 2,
                                "name": "BOT_BUILDER_VIEWER",
                                "created_at": "2022-02-13T14:36:10.612+02:00",
                                "updated_at": "2022-02-13T14:36:10.612+02:00",
                                "application_type_id": 1
                            }
                        ]
                    }
                },
                {
                    "id": "29",
                    "type": "application",
                    "attributes": {
                        "name": "Crm",
                        "logo": "crm logo",
                        "description": "crm description",
                        "applicationable_id": 11,
                        "applicationable_type": "CrmApp",
                        "application_roles": [
                            {
                                "id": 3,
                                "name": "CRM_ADMIN",
                                "created_at": "2022-02-13T14:36:10.626+02:00",
                                "updated_at": "2022-02-13T14:36:10.626+02:00",
                                "application_type_id": 2
                            },
                            {
                                "id": 4,
                                "name": "CRM_VIEWER",
                                "created_at": "2022-02-13T14:36:10.640+02:00",
                                "updated_at": "2022-02-13T14:36:10.640+02:00",
                                "application_type_id": 2
                            }
                        ]
                    }
                }
            ],
            "bot_builder_id": 11,
            "bot_roles": [
                {
                    "id": 1,
                    "name": "ADMIN",
                    "created_at": "2022-02-13T14:36:10.747+02:00",
                    "updated_at": "2022-02-13T14:36:10.747+02:00"
                },
                {
                    "id": 2,
                    "name": "CUSTOM_ROLE",
                    "created_at": "2022-02-13T14:36:10.775+02:00",
                    "updated_at": "2022-02-13T14:36:10.775+02:00"
                }
            ],
            "active_channels": [],
            "users": [],
            "variations_number": 2,
            "engagements_number": 0
        }
    },
    {
        "id": "12",
        "type": "talkybot",
        "attributes": {
            "tenant_id": 1,
            "name": "accounts",
            "industry_field": "software_app_development",
            "image": "https://scontent-frx5-2.xx.fbcdn.net/v/t39.30808-1/cp0/p50x50/272291218_106626641929861_333182610301705992_n.png?_nc_cat=109&ccb=1-5&_nc_sid=dbb9e7&_nc_eui2=AeEc4WfwbhlyF9XmIFE12UZaEkTdAF1t4s0SRN0AXW3izZTfZSTWB7zG-v9_ftceFp_ZNy_1Caurs_r7DnitaBP6&_nc_ohc=dck3xxORELsAX-APELU&_nc_ht=scontent-frx5-2.xx&edm=AJdBtusEAAAA&oh=00_AT9tfNt9v3c-hu-xoOEtDOO8FAHP-soCYtK_Dvd1XM_PyA&oe=621176B2",
            "installed_applications": [
                {
                    "id": "30",
                    "type": "application",
                    "attributes": {
                        "name": "Bot Builder",
                        "logo": "BotBuilderApp logo",
                        "description": "BotBuilderApp description",
                        "applicationable_id": 12,
                        "applicationable_type": "BotBuilderApp",
                        "application_roles": [
                            {
                                "id": 1,
                                "name": "BOT_BUILDER_ADMIN",
                                "created_at": "2022-02-13T14:36:10.598+02:00",
                                "updated_at": "2022-02-13T14:36:10.598+02:00",
                                "application_type_id": 1
                            },
                            {
                                "id": 2,
                                "name": "BOT_BUILDER_VIEWER",
                                "created_at": "2022-02-13T14:36:10.612+02:00",
                                "updated_at": "2022-02-13T14:36:10.612+02:00",
                                "application_type_id": 1
                            }
                        ]
                    }
                },
                {
                    "id": "31",
                    "type": "application",
                    "attributes": {
                        "name": "Crm",
                        "logo": "crm logo",
                        "description": "crm description",
                        "applicationable_id": 12,
                        "applicationable_type": "CrmApp",
                        "application_roles": [
                            {
                                "id": 3,
                                "name": "CRM_ADMIN",
                                "created_at": "2022-02-13T14:36:10.626+02:00",
                                "updated_at": "2022-02-13T14:36:10.626+02:00",
                                "application_type_id": 2
                            },
                            {
                                "id": 4,
                                "name": "CRM_VIEWER",
                                "created_at": "2022-02-13T14:36:10.640+02:00",
                                "updated_at": "2022-02-13T14:36:10.640+02:00",
                                "application_type_id": 2
                            }
                        ]
                    }
                },
                {
                    "id": "32",
                    "type": "application",
                    "attributes": {
                        "name": "Conversation",
                        "logo": "conversation logo",
                        "description": "conversation description",
                        "applicationable_id": 8,
                        "applicationable_type": "ConversationsApp",
                        "application_roles": [
                            {
                                "id": 5,
                                "name": "CONVERSATION_ADMIN",
                                "created_at": "2022-02-13T14:36:10.655+02:00",
                                "updated_at": "2022-02-13T14:36:10.655+02:00",
                                "application_type_id": 3
                            },
                            {
                                "id": 6,
                                "name": "CONVERSATION_VIEWER",
                                "created_at": "2022-02-13T14:36:10.670+02:00",
                                "updated_at": "2022-02-13T14:36:10.670+02:00",
                                "application_type_id": 3
                            }
                        ]
                    }
                }
            ],
            "bot_builder_id": 12,
            "bot_roles": [
                {
                    "id": 1,
                    "name": "ADMIN",
                    "created_at": "2022-02-13T14:36:10.747+02:00",
                    "updated_at": "2022-02-13T14:36:10.747+02:00"
                },
                {
                    "id": 2,
                    "name": "CUSTOM_ROLE",
                    "created_at": "2022-02-13T14:36:10.775+02:00",
                    "updated_at": "2022-02-13T14:36:10.775+02:00"
                }
            ],
            "active_channels": [
                {
                    "channel": "Add page test 2",
                    "provider": "facebook"
                }
            ],
            "users": [],
            "variations_number": 0,
            "engagements_number": 1
        }
    }
]

