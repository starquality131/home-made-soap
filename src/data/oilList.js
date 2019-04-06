const oilList = [
    {
        name: '椰子油',
        enName: 'Coconut',
        // 皂化價
        saponificationValue: 0.19,
        INS: 258,
        // 碘價
        iodineValue: '10',
        // 建議％
        suggestPercentage: '15~35%',
        // 特徵
        feature: '可促進起泡',
    },
    {
        name: '棕櫚油',
        enName: 'Palm',
        // 皂化價
        saponificationValue: 0.141,
        INS: 145,
        // 碘價
        iodineValue: '37-45',
        // 建議％
        suggestPercentage: '10~60%',
        // 特徵
        feature: '不易溶化變形的硬肥皂',
    },
    {
        name: '紅棕櫚油',
        enName: 'Red_Cocoa_Butter',
        // 皂化價
        saponificationValue: 0.141,
        INS: 145,
        // 碘價
        iodineValue: '37-45',
        // 建議％
        suggestPercentage: '10~60%',
        // 特徵
        feature: '不易溶化變形的硬肥皂',
    },
    {
        name: '橄欖油',
        enName: 'Olive_Oil',
        // 皂化價
        saponificationValue: 0.134,
        INS: 109,
        // 碘價
        iodineValue: '79-95',
        // 建議％
        suggestPercentage: '可100%使用',
        // 特徵
        feature: '保濕力',
    },
    {
        name: '乳油木果脂',
        enName: 'Shea_Butter',
        // 皂化價
        saponificationValue: 0.128,
        INS: 116,
        // 碘價
        iodineValue: '55-71',
        // 建議％
        suggestPercentage: '5~10%',
        // 特徵
        feature: '不易溶化變形的硬肥皂,並能在皮膚上形成保護膜',
    },
    {
        name: '可可脂',
        enName: 'Cocoa_Butter',
        // 皂化價
        saponificationValue: 0.137,
        INS: 157,
        // 碘價
        iodineValue: '33-44',
        // 建議％
        suggestPercentage: '5~10%',
        // 特徵
        feature: '不易溶化變形的硬肥皂,並能在皮膚上形成保護膜',
    },
    {
        name: '甜杏仁油',
        enName: 'Almond_Sweet',
        // 皂化價
        saponificationValue: 0.136,
        INS: 97,
        // 碘價
        iodineValue: '93-105',
        // 建議％
        suggestPercentage: '15~30%',
        // 特徵
        feature: '保濕力',
    },
    {
        name: '杏桃核仁油',
        enName: 'Apricot_Kernel',
        // 皂化價
        saponificationValue: 0.135,
        INS: 91,
        // 碘價
        iodineValue: '92-108',
        // 建議％
        suggestPercentage: '15~30%',
        // 特徵
        feature: '保濕力',
    },
    {
        name: '酪梨油',
        enName: 'Avocado',
        // 皂化價
        saponificationValue: 0.133,
        INS: 99,
        // 碘價
        iodineValue: '82-90',
        // 建議％
        suggestPercentage: '10~30%',
        // 特徵
        feature: '保濕力',
    },
    {
        name: '山茶花(椿油)',
        enName: 'Camellia',
        // 皂化價
        saponificationValue: 0.1362,
        INS: 108,
        // 碘價
        iodineValue: '78-88',
        // 建議％
        suggestPercentage: '可100%使用',
        // 特徵
        feature: '保濕力',
    },
    {
        name: '蓖麻油',
        enName: 'Castor',
        // 皂化價
        saponificationValue: 0.1286,
        INS: 95,
        // 碘價
        iodineValue: '82-90',
        // 建議％
        suggestPercentage: '5~20%',
        // 特徵
        feature: '保濕力',
    },
    {
        name: '榛果油',
        enName: 'Hazelnut',
        // 皂化價
        saponificationValue: 0.1356,
        INS: 94,
        // 碘價
        iodineValue: '90-103',
        // 建議％
        suggestPercentage: '15~30%',
        // 特徵
        feature: '保濕力',
    },
    {
        name: '澳洲胡桃油',
        enName: 'Macadamia',
        // 皂化價
        saponificationValue: 0.139,
        INS: 119,
        // 碘價
        iodineValue: '73-79',
        // 建議％
        suggestPercentage: '15~30%',
        // 特徵
        feature: '保濕力',
    },
    {
        name: '荷荷芭油',
        enName: 'Jojoba',
        // 皂化價
        saponificationValue: 0.066,
        INS: 11,
        // 碘價
        iodineValue: '80-85',
        // 建議％
        suggestPercentage: '5~10%',
        // 特徵
        feature: '保濕力',
    },
    {
        name: '米糠油(玄米油)',
        enName: 'Rice_Bran',
        // 皂化價
        saponificationValue: 0.128,
        INS: 70,
        // 碘價
        iodineValue: '110',
        // 建議％
        suggestPercentage: '20%',
        // 特徵
        feature: '有清爽感覺肥皂的油',
    },
    {
        name: '開心果油',
        enName: 'Pistachio_Nut',
        // 皂化價
        saponificationValue: 0.1328,
        INS: 92,
        // 碘價
        iodineValue: '93-96',
        // 建議％
        suggestPercentage: '20~72%',
        // 特徵
        feature: '',
    },
    {
        name: '葡萄籽油',
        enName: 'Grapeseed',
        // 皂化價
        saponificationValue: 0.1265,
        INS: 66,
        // 碘價
        iodineValue: '125-137',
        // 建議％
        suggestPercentage: '10%',
        // 特徵
        feature: '有清爽感覺肥皂的油',
    },
    {
        name: '月桂油',
        enName: 'Laurus_nobilis_fruit_Oil',
        // 皂化價
        saponificationValue: 0.141,
        INS: 124,
        // 碘價
        iodineValue: '',
        // 建議％
        suggestPercentage: '5-25%',
        // 特徵
        feature: '',
    },
    {
        name: '月見草油',
        enName: 'Evening_Primrose',
        // 皂化價
        saponificationValue: 0.1357,
        INS: 30,
        // 碘價
        iodineValue: '150-170',
        // 建議％
        suggestPercentage: '5%-superfatting',
        // 特徵
        feature: '對問題皮膚特別有效用的油',
    },
    {
        name: '蜜蠟',
        enName: 'Beeswax',
        // 皂化價
        saponificationValue: 0.069,
        INS: 84,
        // 碘價
        iodineValue: '',
        // 建議％
        suggestPercentage: '<6%',
        // 特徵
        feature: '熔點61-66度',
    },
    {
        name: '白油',
        enName: 'Shortening_(veg.)',
        // 皂化價
        saponificationValue: 0.136,
        INS: 115,
        // 碘價
        iodineValue: '90-95',
        // 建議％
        suggestPercentage: '10~20%',
        // 特徵
        feature: '',
    },
];

export default oilList;
