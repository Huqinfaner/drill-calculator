// 材料与刀具参数数据库
const materialDB = {
    // 钻头材料
    toolMaterials: {
        hss_6542: { name: "普通6542高速钢" },
        hss_m35: { name: "M35高速钢" },
        carbide: { name: "硬质合金" },
        coated_carbide: { name: "涂层硬质合金" }
    },
    // 被加工材料
    workMaterials: {
        stainless_steel: { 
            name: "马氏体不锈钢", 
            vcRange: { 
                hss_6542: [10, 15], 
                hss_m35: [12, 18], 
                carbide: [20, 30], 
                coated_carbide: [25, 35] 
            }, 
            fRange: { 
                hss_6542: [0.02, 0.06], 
                hss_m35: [0.03, 0.08], 
                carbide: [0.05, 0.12], 
                coated_carbide: [0.06, 0.15] 
            } 
        },
        aluminum: { 
            name: "铝合金", 
            vcRange: { 
                hss_6542: [40, 80], 
                hss_m35: [50, 100], 
                carbide: [100, 200], 
                coated_carbide: [120, 250] 
            }, 
            fRange: { 
                hss_6542: [0.08, 0.25], 
                hss_m35: [0.10, 0.30], 
                carbide: [0.15, 0.40], 
                coated_carbide: [0.20, 0.50] 
            } 
        },
        titanium: { 
            name: "钛合金", 
            vcRange: { 
                hss_6542: [8, 15], 
                hss_m35: [10, 20], 
                carbide: [20, 40], 
                coated_carbide: [25, 50] 
            }, 
            fRange: { 
                hss_6542: [0.01, 0.04], 
                hss_m35: [0.02, 0.06], 
                carbide: [0.03, 0.08], 
                coated_carbide: [0.04, 0.10] 
            } 
        }
    }
};

function calculate() {
    // 获取输入值
    const diameter = parseFloat(document.getElementById('diameter').value);
    const toolMaterial = document.getElementById('toolMaterial').value;
    const workMaterial = document.getElementById('workMaterial').value;
    
    // 校验输入
    if (!diameter) {
        alert("请填写钻头直径！");
        return;
    }

    // 获取材料参数
    const { vcRange, fRange } = materialDB.workMaterials[workMaterial];
    const vcMin = vcRange[toolMaterial][0];
    const vcMax = vcRange[toolMaterial][1];
    const fMin = fRange[toolMaterial][0];
    const fMax = fRange[toolMaterial][1];
    
    // 计算转速范围 (r/min)
    const rpmMin = (1000 * vcMin) / (Math.PI * diameter);
    const rpmMax = (1000 * vcMax) / (Math.PI * diameter);
    
    // 计算进给速度范围 (mm/min)
    const feedRateMin = rpmMin * fMin;
    const feedRateMax = rpmMax * fMax;

    // 显示结果
    document.getElementById('rpm').textContent = `${rpmMin.toFixed(0)} - ${rpmMax.toFixed(0)}`;
    document.getElementById('feedRate').textContent = `${feedRateMin.toFixed(1)} - ${feedRateMax.toFixed(1)}`;
}