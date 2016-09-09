//combobox temp data
var comboboxData = Ext.create("Ext.data.Store", {
    fields: ["name", "value"],
    data: [
        {
            name: "不检查消息", value: 0
        }, {
            name: "检查消息", value: 1
        }, {
            name: "检查消息+声音", value: 2
        }, {
            name: "检查消息+弹窗", value: 3
        }, {
            name: "检查消息+声音+弹窗", value: 4
        }
    ]
});


//main
Ext.define('app.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: "app-main",
    requires: [
        "app.view.main.MainController",
        "app.view.main.CenterCard",
        "Ext.form.*",
        "Ext.panel.Panel",
        "Ext.layout.container.*",
        "Ext.toolbar.*",
        "Ext.container.Container",
        "Ext.button.Button",
    ],
    controller: "main",
    layout: "border",
    bodyBorder: false,
    items: [
        {
            xtype: "MainHeader",
            id: "north",
            region: "north",
        },
        {
            id: "south",
            xtype: "panel",
            region: "south",
            tbar: [
                {
                    xtype: "label",
                    text: "帐套：DRP软件"
                },
                {
                    xtype: "label",
                    text: "公司：总公司"
                },
                {
                    xtype: "label",
                    text: "当前操作员：管理员"
                }, "->",
                {
                    xtype: "checkbox",
                    fieldLabel: "",
                    boxLabel: "允许重复标签"
                }, "-",
                {
                    xtype: "label",
                    text: "我的状态："
                },
                {
                    xtype: "radio",
                    boxLabel: "正常",
                    name: "myStatus",
                    value: 1
                },
                {
                    xtype: "radio",
                    boxLabel: "忙碌",
                    name: "myStatus",
                    value: 2
                },
                {
                    xtype: "radio",
                    boxLabel: "离开",
                    name: "myStatus",
                    value: 3
                }, "-",
                {
                    xtype: "button",
                    iconCls: "x-fa fa-volume-down",
                    listeners: {
                        click: "ShowMessageWindow"
                    }
                },
                {
                    xtype: "combobox",
                    fieldLabel: "",
                    store: comboboxData,
                    displayField: "name",
                    valueField: "id"
                }, "-",
                {
                    xtype: "label",
                    text: Ext.Date.format(new Date(), "Y/m/d")
                }

            ]
        },
        {
            region: "center",
            xtype: "center",
        }
    ]
});