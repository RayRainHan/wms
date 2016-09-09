var MainCard = Ext.define("app.view.main.CenterCard", {
    extend: "Ext.tab.Panel",
    requires: [
        "Ext.panel.Panel",
        "Ext.layout.container.*",
        "Ext.tab.Panel",
    ],
    xtype: 'center',
    alias:"widget.Center",

    layout: "card",
    activeItem: 0,

    items: [
        {
            title: "系统桌面",
            layout: "vbox",
            defaults: {
                width: "100%",
            },
            items: [
                {
                    xtype: "panel",
                    layout: "hbox",
                    defaults: {
                        margin: 20,
                        frame: true
                    },
                    items: [
                        {
                            xtype: "panel",
                            title: "<p class='main-category-title'>库存总量</p><span>1101.00</span>",
                            flex: 1,
                            html: "<div class='main-category-content'><p>商品种类</p><p>4</p></div>"
                        },
                        {
                            xtype: "panel",
                            title: "<p class='main-category-title'>货位总数</p><span>21</span>",
                            flex: 1,
                            html: "<div class='main-category-content'><p>空仓货位</p><p>14</p></div>"
                        }, {
                            xtype: "panel",
                            title: "<p class='main-category-title'>今日预约入库商品</p><span>0.00</span>",
                            flex: 1,
                            html: "<div class='main-category-content'><p>已完成数</p><p>0.00</p></div>"
                        }, {
                            xtype: "panel",
                            title: "<p class='main-category-title'>今日预约出库商品</p><span>0.00</span>",
                            flex: 1,
                            html: "<div class='main-category-content'><p>已完成数</p><p>0.00</p></div>"
                        }, {
                            xtype: "panel",
                            title: "<p class='main-category-title'>本月已入库商品</p><span>1172.00</span>",
                            flex: 1,
                            html: "<div class='main-category-content'><p>本月已出库商品</p><p>10.00</p></div>"
                        }
                    ]
                },
                {
                    xtype: "tabpanel",
                    frame: true,
                    //layout: "fit",
                    flex: 1,
                    //height: 470,
                    items: [{
                        title: 'P1',
                        html: "111111111111111111111"
                    }, {
                        title: 'P2',
                        html: "222222222222222222222"
                    }, {
                        title: 'P3',
                        html: "333333333333333333333"
                    }]
                }
            ],
        },
    ],
});