const METRIC_INFO = {
    healthy: 0,
    looseness: 1,
    misalignment: 2,
    "anomalous vibration detected": 3,
    "no rms values found": 4,
    "no data found": 5,
}

const METRIC_INFO_PARSED = {
    healthy: 0,
    looseness: 1,
    misalignment: 2,
    anomalous: 3,
    no_rms: 4,
    no_data: 5,
}
const devices = [
    {
        asset_id: "6d8fe791-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 6",
        asset_name: "FAN",
        asset_location: "DRIVE END",
        asset_mac_id: "040D844CE52B",
    },
    {
        asset_id: "6d9083d1-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 6",
        asset_name: "FAN",
        asset_location: "NON DRIVE END",
        asset_mac_id: "",
    },
    {
        asset_id: "6d8fe790-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 6",
        asset_name: "MOTOR",
        asset_location: "DRIVE END",
        asset_mac_id: "040D844CE530",
    },
    {
        asset_id: "6d9083d0-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 6",
        asset_name: "MOTOR",
        asset_location: "NON DRIVE END",
        asset_mac_id: "040D844CE521",
    },
    {
        asset_id: "6d973a90-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 5",
        asset_name: "FAN",
        asset_location: "DRIVE END",
        asset_mac_id: "040D844CE534",
    },
    {
        asset_id: "6d8e8800-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 5",
        asset_name: "FAN",
        asset_location: "NON DRIVE END",
        asset_mac_id: "040D844CE56D",
    },
    {
        asset_id: "6d8f4b50-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 5",
        asset_name: "MOTOR",
        asset_location: "DRIVE END",
        asset_mac_id: "040D844CE56A",
    },
    {
        asset_id: "6d8fc080-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 5",
        asset_name: "MOTOR",
        asset_location: "NON DRIVE END",
        asset_mac_id: "040D844CE559",
    },
    {
        asset_id: "6d8a1b33-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 4",
        asset_name: "FAN",
        asset_location: "DRIVE END",
        asset_mac_id: "040D844CE571",
    },
    {
        asset_id: "6d8a1b32-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 4",
        asset_name: "FAN",
        asset_location: "NON DRIVE END",
        asset_mac_id: "040D844CE56B",
    },
    {
        asset_id: "6d8a4241-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 4",
        asset_name: "MOTOR",
        asset_location: "DRIVE END",
        asset_mac_id: "040D844CE55B",
    },
    {
        asset_id: "6d8a1b30-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 4",
        asset_name: "MOTOR",
        asset_location: "NON DRIVE END",
        asset_mac_id: "040D844CE522",
    },
    {
        asset_id: "6d8b7ac0-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 3",
        asset_name: "FAN",
        asset_location: "DRIVE END",
        asset_mac_id: "040D844CE54C",
    },
    {
        asset_id: "6d8a4240-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 3",
        asset_name: "FAN",
        asset_location: "NON DRIVE END",
        asset_mac_id: "040D844CE542",
    },
    {
        asset_id: "6d8a1b31-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 3",
        asset_name: "MOTOR",
        asset_location: "DRIVE END",
        asset_mac_id: "040D844CE533",
    },
    {
        asset_id: "6d8a6950-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 3",
        asset_name: "MOTOR",
        asset_location: "NON DRIVE END",
        asset_mac_id: "040D844CE552",
    },
    {
        asset_id: "6d7f45c2-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 2",
        asset_name: "FAN",
        asset_location: "DRIVE END",
        asset_mac_id: "040D844CE555",
    },
    {
        asset_id: "6d7f45c1-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 2",
        asset_name: "FAN",
        asset_location: "NON DRIVE END",
        asset_mac_id: "040D844CE53B",
    },
    {
        asset_id: "6d8f7261-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 2",
        asset_name: "MOTOR",
        asset_location: "DRIVE END",
        asset_mac_id: "040D844CE54B",
    },
    {
        asset_id: "6d7ea980-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 2",
        asset_name: "MOTOR",
        asset_location: "NON DRIVE END",
        asset_mac_id: "040D844CE581",
    },
    {
        asset_id: "6d7ea981-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 1",
        asset_name: "FAN",
        asset_location: "DRIVE END",
        asset_mac_id: "040D844CE53F",
    },
    {
        asset_id: "6d7ea982-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 1",
        asset_name: "FAN",
        asset_location: "NON DRIVE END",
        asset_mac_id: "040D844CE551",
    },
    {
        asset_id: "6d7f45c0-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 1",
        asset_name: "MOTOR",
        asset_location: "DRIVE END",
        asset_mac_id: "040D844CE549",
    },
    {
        asset_id: "6d7f93e0-3039-11ed-81ef-d732cfd46ac3",
        exhauster_name: "Exhauster 1",
        asset_name: "MOTOR",
        asset_location: "NON DRIVE END",
        asset_mac_id: "040D844CE4FB",
    },
]

export { METRIC_INFO, METRIC_INFO_PARSED, devices }
