var data = {
    "extra": {
        "fatal_item_ids": [

        ],
        "logid": "2020121816574701019806019933018921",
        "now": 1608281867000
    },
    "log_pb": {
        "impr_id": "2020121816574701019806019933018921"
    },
    "status_code": 0,
    "user": {
        "shop_micro_app": "",
        "urge_detail": {
            "user_urged": 0
        },
        "with_commerce_enterprise_tab_entry": false,
        "commerce_user_info": {
            "has_ads_entry": false,
            "ad_revenue_rits": null,
            "star_atlas": 1,
            "show_star_atlas_cooperation": true
        },
        "video_cover": {

        },
        "uid": "58948149403",
        "tab_settings": {
            "private_tab": {
                "show_private_tab": false,
                "private_tab_style": 1
            }
        },
        "avatar_thumb": {
            "width": 720,
            "height": 720,
            "uri": "tos-cn-avt-0015/5b04405f0f23e0eae6958ae083a571cf",
            "url_list": [
                "https://p9-dy.byteimg.com/tos-cn-avt-0015/5b04405f0f23e0eae6958ae083a571cf~tplv-dy-shrink:188:188.webp",
                "https://p5-dy-ipv6.byteimg.com/img/tos-cn-avt-0015"
            ]
        },
        "original_musician": {
            "music_count": 0,
            "music_used_count": 0,
            "digg_count": 0
        },
        "follower_status": 0,
        "profile_tab_type": 0,
        "is_effect_artist": false,
        "birthday_hide_level": 0,
    }
}

var names = [
    { key: 'Root', name: '根目录' },
    { key: 'extra', name: '额外' },
    { key: 'fatal_item_ids', name: '物品标识' },
    { key: 'logid', name: '日志id' },
    { key: 'now', name: '时间戳' },
    { key: 'log_pb', name: 'pb日志' },
    { key: 'impr_id', name: '改进id' },
    { key: 'status_code', name: '状态码' },
    { key: 'user', name: '用户' },
    { key: 'shop_micro_app', name: '商场应用' },
    { key: 'urge_detail', name: '详情' },
    { key: 'user_urged', name: '用户细节详情' },
    { key: 'with_commerce_enterprise_tab_entry', name: '企业选择' },
    { key: 'commerce_user_info', name: '商业用户信息' },
];

module.exports = {
    data, names
};