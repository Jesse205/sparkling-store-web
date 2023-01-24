// https://source.android.google.cn/docs/setup/about/build-numbers
let sdkMap = {
    1: '1.0',
    2: '1.1',
    3: '1.5',
    4: '1.6',
    5: '2.0',
    6: '2.0.1',
    7: '2.1',
    8: '2.2.x',
    9: '2.3 - 2.3.2',
    10: '2.3.3 - 2.3.7',
    11: '3.0',
    12: '3.1',
    13: '3.2.x',
    14: '4.0.1 - 4.0.2',
    15: '4.0.3 - 4.0.4',
    16: '4.1.x',
    17: '4.2.x',
    18: '4.3.x',
    19: '4.4 - 4.4.4',
    21: '5.0',
    22: '5.1',
    23: '6.0',
    24: '7.0',
    25: '7.1',
    26: '8.0.0',
    27: '8.1.0',
    28: '9',
    29: '10',
    30: '11',
    31: '12',
    32: '12',
    33: '13'
}
export function getAndroidVerNameByApi(apiNum) {
    if (apiNum)
        return sdkMap[apiNum] ? `Android ${sdkMap[apiNum]}` : `API ${apiNum}`
}
