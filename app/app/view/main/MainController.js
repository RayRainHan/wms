var CommonMenuData = {
    "success": true,
    "msg": null,
    "n": 0,
    "obj": {
        "menu": [{
            "menu": {
                "items": [{"id": "BILL_RUKU", "fav": true, "text": "新增入库单"}, {
                    "id": "BILL_ACTW_IN",
                    "fav": true,
                    "text": "收货预检单"
                }, {"id": "ALLOC_SLOT_INFO", "text": "入库上架"}, {"xtype": "menuseparator"}, {
                    "id": "BILL_CHUKU",
                    "text": "新增出库单"
                }, {"id": "BILL_ACTW_OUT", "text": "货位出库单"}, {
                    "id": "ALLOC_SLOT2_INFO",
                    "text": "出库下架"
                }, {"id": "BILL_CHUKU_FJ", "text": "出货预检单"}]
            }, "text": "进出管理"
        }, {
            "menu": {
                "items": [{"id": "BILL_BAO_SUN", "text": "报损单"}, {
                    "id": "BILL_BAO_YI",
                    "text": "报溢单"
                }, {
                    "menu": {"items": [{"id": "BILL_MOVE_SAME", "text": "货位调整单"}]},
                    "text": "理货管理"
                }, {"xtype": "menuseparator"}, {"id": "PRODUCT_STOCK2_INFO", "text": "库存状况表"}, {
                    "id": "STOCK_DIST_ALL_INFO",
                    "text": "库存分布表"
                }, {"id": "STOCK_BATCH2_INFO", "text": "商品近效期查询"}, {
                    "id": "STOCK_BATCH_INFO",
                    "text": "库存批次查询"
                }, {"id": "RPT_WH_INOUT_INFO", "text": "出入库汇总表"}, {
                    "menu": {
                        "items": [{
                            "id": "BILL_PANDIAN2",
                            "text": "库存盘点"
                        }, {"id": "PANDIAN|~_INFO", "text": "库存盘点查询"}, {
                            "id": "RPT_PRODUCT_IO_INFO",
                            "text": "日出入库统计盘点"
                        }]
                    }, "text": "盘点管理"
                }]
            }, "text": "库存管理"
        }, {
            "menu": {
                "items": [{"id": "SUPPLIER_INFO", "text": "货主信息"}, {
                    "id": "PRODUCT_INFO",
                    "text": "商品信息"
                }, {"id": "CUSTOMER_INFO", "text": "收货方信息"}, {"id": "STAFF_INFO", "text": "部门与职员"}, {
                    "id": "WAREHOUSE_INFO",
                    "text": "仓库与货位"
                }, {"id": "SITE", "text": "公司信息"}, {"id": "CS_PRODUCT_INFO", "text": "客户商品信用额度"}]
            }, "text": "基本信息"
        }, {
            "menu": {
                "items": [{"id": "DRAFT_INFO", "text": "业务草稿"}, {
                    "id": "LICHENG_INFO",
                    "text": "经营历程"
                }, {"id": "PB_DETAILO_INFO", "text": "单据导出"}, {"id": "BILL_IMPORT", "text": "EDI数据导入"}]
            }, "text": "单据中心"
        }, {
            "menu": {
                "items": [{"id": "OPERATOR_INFO", "text": "操作员权限"}, {
                    "id": "SGROUP_INFO",
                    "text": "角色管理"
                }, {"id": "OPERATOR2_INFO", "text": "安全钥匙管理"}, {
                    "id": "CONFIG",
                    "text": "系统配置"
                }, {"xtype": "menuseparator"}, {"id": "SET_START", "text": "期初建账"}, {
                    "id": "MONTH_SAVE",
                    "text": "月结存"
                }, {
                    "menu": {"items": [{"id": "OPEN_ACC", "text": "系统开账"}, {"id": "REBUILD", "text": "系统重建"}]},
                    "text": "账套管理"
                }, {"id": "ABOUT", "text": "版本信息"}, {
                    "menu": {
                        "items": [{
                            "id": "SMS_ACC",
                            "text": "短信帐号"
                        }, {"id": "SMS_LIMIT_INFO", "text": "操作员短信额度"}, {"id": "SMS_HIST_INFO", "text": "充值发送历史"}]
                    }, "text": "短信管理"
                }, {"id": "MENU", "text": "菜单定制"}, {"id": "BILL_FLOW_INFO", "text": "单据审核设置"}]
            }, "text": "系统管理"
        }, {
            "menu": {
                "items": [{
                    "menu": {
                        "items": [{"id": "ONLINE_INFO", "text": "在线操作员"}, {
                            "id": "MSG_INFO",
                            "text": "站内消息管理"
                        }, {"id": "LEAVE_MSG_INFO", "text": "离开类型设置"}, {"id": "MSG_TPL_INFO", "text": "消息模板"}, {
                            "id": "MSGB_INFO",
                            "text": "发送失败消息"
                        }]
                    }, "text": "消息中心"
                }]
            }, "text": "运营管理"
        }]
    },
    "metaData": {},
    "tbl": null
};
//handle store
function HandleStore(obj) {
    if (obj.length && obj.length > 0) {
        for (item in obj) {
            if (obj[item].menu) {
                obj[item].children = obj[item].menu;
                delete obj[item].menu;
            }
            if (obj[item].children.items && obj[item].children.items.length > 0) {
                obj[item].checked = false;
                obj[item].children = HandleStore(obj[item].children);
            }
        }
        return obj;
    }
    if (obj.items && obj.items.length > 0) {
        var temp = [];
        for (item in obj.items) {
            if (obj.items[item].fav) {
                obj.items[item].checked = obj.items[item].fav;
                delete obj.items[item].fav;
            }
            else
                obj.items[item].checked = false;
            obj.items[item].leaf = true;
            if (obj.items[item].xtype)
                delete obj.items[item];
            else
                temp.push(obj.items[item]);
        }
        return temp;
    }
}
CommonMenuData.obj.menu = HandleStore(CommonMenuData.obj.menu);

var CommonMenuStore = Ext.create('Ext.data.TreeStore', {
    root: {
        expanded: true,
        children: CommonMenuData.obj.menu
    }
});


Ext.define('app.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    requires: [
        "Ext.list.Tree",
    ],

    SetCommonMenuWindow: function () {
        var commonWindow = Ext.create("Ext.window.Window", {
            title: "配置常用菜单",
            width: 600,
            height: 600,
            layout: "hbox",
            resizable: false,
            modal: true,
            defaults: {
                height: "100%"
            },
            items: [
                {
                    xtype: "fieldset",
                    padding: 10,
                    flex: 3,
                    title: "所有系统功能",
                    autoScroll: true,
                    margin: "0 10",
                    items: {
                        xtype: "treepanel",
                        useArrows: true,
                        rootVisible: false,
                        rowLines: true,
                        //frame: true,
                        store: CommonMenuStore
                    }
                },
                {
                    xtype: "panel",
                    layout: "vbox",
                    margin: "0 10",
                    items: [
                        {
                            flex: 4
                        },
                        {
                            xtype: "button",
                            flex: 1,
                            iconCls: "x-fa fa-minus",
                            handler: "DeleteSelectedMenuEvent"
                        },
                        {
                            flex: 4
                        },
                        {
                            xtype: "button",
                            flex: 1,
                            iconCls: "x-fa fa-plus",
                            handler: "AddNewMenuEvent"
                        },
                        {
                            flex: 4
                        },
                    ]
                },
                {
                    xtype: "fieldset",
                    padding: 10,
                    flex: 3,
                    title: "已选功能",
                    //autoScroll: true,
                    margin: "0 10",
                    items: {
                        xtype: "grid",
                        border: true,
                        layout: "fit",
                        columns: [
                            {text: "行号"},
                            {text: "名称"},
                        ],
                    }
                }
            ],
            bbar: ["->",
                {
                    text: "清空",
                },
                {
                    text: "确定",
                },
                {
                    text: "取消",
                    handler: function () {
                        commonWindow.close();
                    }
                },
                "->"
            ]
        }).show();
    },

    ShowMessageWindow: function () {
        var msgWindow = Ext.create("Ext.window.Window", {
            title: "消息",
            height: 200,
            width: 300,
            draggable: false,
            resizable: false,
            x: document.body.clientWidth - 300,
            y: document.body.clientHeight - 200,
            items: {
                xtype: "panel",
                layout: "fit",
                html: "<p class='text-center'>暂无数据</p>",
                tbar: [
                    {
                        text: "发送信息",
                        handler: "SendMessageWindow"
                    }
                ]
            }
        }).show();
    },

    SendMessageWindow: function () {
        var sendWindow = Ext.create("Ext.window.Window", {
            title: "发送信息",
            width: 500,
            height: 300,
            layout: "fit",
            resizable: false,
            modal: true,
            items: [
                {
                    xtype: "form",
                    layout: "form",
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: "类型",
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: "combobox",
                                    allowBlank: false,
                                    store: comboboxData,
                                    displayField: "name",
                                    valueField: "id"
                                },
                                {
                                    xtype: "button",
                                    iconCls: "x-fa fa-plus",
                                    handler: "AddTypeWindow"
                                }

                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: "接收者",
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: "textfield",
                                    allowBlank: false,
                                    name: "receiveUser",
                                    readOnly: true,
                                    listeners: {
                                        dblclick: "SelectReceiverWindow"
                                    }
                                },
                                {
                                    xtype: "button",
                                    iconCls: "x-fa fa-search",
                                    handler: "SelectReceiverWindow"
                                }
                            ]
                        },
                        {
                            xtype: "textarea",
                            fieldLabel: "发送文本",
                            allowBlank: false,
                        },
                        {
                            xtype: "checkbox",
                            fieldLabel: "私有信息，不保存",
                        },
                        {
                            xtype: "checkbox",
                            fieldLabel: "重要信息<span class='x-fa fa-cog'></span>",
                            iconCls: "x-fa fa-cog"
                        },
                    ],
                    bbar: ["->",
                        {
                            text: "发送",
                            defaultAlign: "center",
                            handler: "SendMessageEvent"
                        },
                        {
                            text: "取消",
                            handler: function () {
                                sendWindow.close();
                            }
                        },
                        "->"
                    ]
                }
            ]
        }).show();
    },

    AddTypeWindow: function () {
        var typeWindow = Ext.create("Ext.window.Window", {
            title: "类型",
            width: 300,
            height: 350,
            resizable: false,
            modal: true,
            items: {
                xtype: "grid",
                border: false,
                columns: [
                    {text: "名称"},
                ],
                store: Ext.create("Ext.data.ArrayStore", {}),
                buttons: [
                    {
                        xtype: "button",
                        text: "新增"
                    },
                    {
                        xtype: "button",
                        text: "删除"
                    },
                    {
                        xtype: "button",
                        text: "关闭"
                    }
                ]
            }
        }).show();
    },

    SelectReceiverWindow: function () {
        var typeWindow = Ext.create("Ext.window.Window", {
            title: "接收者",
            width: 800,
            height: 600,
            resizable: false,
            modal: true,
            defaults: {
                width: "100%",
            },
            layout: "vbox",
            items: [
                {
                    xtype: "panel",
                    tbar: ["->",
                        {
                            xtype: "textfield",
                            fieldLabel: "快速查找",
                            labelAlign: "right"
                        },
                        {
                            xtype: "button",
                            text: "查询"
                        }
                    ],
                    bbar: [
                        {
                            xtype: "button",
                            text: "显示离线用户",
                            iconCls: "x-fa fa-user"
                        },
                        {
                            xtype: "button",
                            text: "发送消息",
                            iconCls: "x-fa fa-envelope-o"
                        },
                        {
                            xtype: "button",
                            text: "配置",
                            iconCls: "x-fa fa-cog"
                        },
                        {
                            xtype: "button",
                            text: "刷新",
                            iconCls: "x-fa fa-refresh"
                        }
                    ]
                },
                {
                    xtype: "grid",
                    id: "ReceiverGrid",
                    flex: 1,
                    border: true,
                    columns: [
                        {text: "序号", dataIndex: ""},
                        {text: "操作员", dataIndex: ""},
                        {text: "登录时间", dataIndex: ""},
                        {text: "在线时长", dataIndex: ""},
                        {text: "状态", dataIndex: ""},
                        {text: "离线描述", dataIndex: ""},
                    ],
                    viewConfig: {
                        columnLines: true
                    }
                }
            ]
        }).show();
    },

    SendMessageEvent: function () {
        alert("SendMessageEvent");
    },

    DeleteSelectedMenuEvent: function () {
        alert("DeleteSelectedMenuEvent");
    },

    AddNewMenuEvent: function () {
        alert("AddNewMenuEvent");
    },

});
