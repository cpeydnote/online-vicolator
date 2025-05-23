// 頁面載入完成後執行
document.addEventListener('DOMContentLoaded', function() {
    // 獲取桌面版按鈕
    const rcPlateBtn = document.getElementById('rc-plate-btn');
    const rcBeamBtn = document.getElementById('rc-beam-btn');
    const steelPlateBtn = document.getElementById('steel-plate-btn');
    const t99AsdBtn = document.getElementById('t99-asd-btn');
    const aiscBtn = document.getElementById('aisc-btn');
    
    // 獲取移動版下拉選單
    const mobileTypeDropdown = document.getElementById('mobile-type-dropdown');
    const mobileStandardDropdown = document.getElementById('mobile-standard-dropdown');
    
    const rcPlateContent = document.getElementById('rc-plate-content');
    const rcBeamContent = document.getElementById('rc-beam-content');
    const steelPlateContent = document.getElementById('steel-plate-content');
    
    // 獲取輸入字段 - RC板
    const steelPipeSpec = document.getElementById('steel-pipe-spec');
    const materialLabel = document.getElementById('material-label');
    const beamInterval = document.getElementById('beam-interval');
    const workLoad = document.getElementById('work-load');
    const plateThickness = document.getElementById('plate-thickness');
    const supportHeight = document.getElementById('support-height');
    const testStrength = document.getElementById('test-strength');
    
    // 獲取輸入字段 - RC梁
    const steelPipeSpecBeam = document.getElementById('steel-pipe-spec-beam');
    const materialLabelBeam = document.getElementById('material-label-beam');
    const beamSupportCount = document.getElementById('beam-support-count');
    const workLoadBeam = document.getElementById('work-load-beam');
    const plateThicknessBeam = document.getElementById('plate-thickness-beam');
    const supportHeightBeam = document.getElementById('support-height-beam');
    const testStrengthBeam = document.getElementById('test-strength-beam');
    
    // 獲取顯示元素 - RC板
    const valueE = document.getElementById('value-e');
    const valueF = document.getElementById('value-f');
    const bDimensionValue = document.getElementById('b-dimension-value');
    const cDimensionValue = document.getElementById('c-dimension-value');
    
    // 獲取顯示元素 - RC梁
    const valueEBeam = document.getElementById('value-e-beam');
    const valueFBeam = document.getElementById('value-f-beam');
    const bDimensionValueBeam = document.getElementById('b-dimension-value-beam');
    const cDimensionValueBeam = document.getElementById('c-dimension-value-beam');
    
    // 移動版選單相關
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // 設定初始值為空白（不預先選擇規格）
    updatePipeSpecValues('');
    if (steelPipeSpecBeam) {
        updatePipeSpecValuesBeam('');
    }
    
    // 設置輸入欄位預設提示文字
    setPlaceholders();
    setPlaceholdersBeam();
    
    // 更新初始結果顯示
    updateResultValues();
    updateResultValuesBeam();
    
    // 桌面版標籤按鈕點擊事件
    if (rcPlateBtn) {
        rcPlateBtn.addEventListener('click', function() {
            setActiveContent('rc-plate-content');
            setActiveTab('rc-plate-btn');
        });
    }
    
    if (rcBeamBtn) {
        rcBeamBtn.addEventListener('click', function() {
            setActiveContent('rc-beam-content');
            setActiveTab('rc-beam-btn');
        });
    }
    
    if (steelPlateBtn) {
        steelPlateBtn.addEventListener('click', function() {
            setActiveContent('steel-plate-content');
            setActiveTab('steel-plate-btn');
        });
    }
    
    if (t99AsdBtn) {
        t99AsdBtn.addEventListener('click', function() {
            setActiveRightTab('t99-asd-btn');
        });
    }
    
    if (aiscBtn) {
        aiscBtn.addEventListener('click', function() {
            setActiveRightTab('aisc-btn');
        });
    }
    
    // 移動版下拉選單變更事件
    if (mobileTypeDropdown) {
        mobileTypeDropdown.addEventListener('change', function() {
            const selectedType = this.value;
            
            if (selectedType === 'rc-plate') {
                setActiveContent('rc-plate-content');
                if (rcPlateBtn) setActiveTab('rc-plate-btn');
            } else if (selectedType === 'rc-beam') {
                setActiveContent('rc-beam-content');
                if (rcBeamBtn) setActiveTab('rc-beam-btn');
            } else if (selectedType === 'steel-plate') {
                setActiveContent('steel-plate-content');
                if (steelPlateBtn) setActiveTab('steel-plate-btn');
            }
        });
    }
    
    if (mobileStandardDropdown) {
        mobileStandardDropdown.addEventListener('change', function() {
            const selectedStandard = this.value;
            
            if (selectedStandard === 't99-asd') {
                if (t99AsdBtn) setActiveRightTab('t99-asd-btn');
            } else if (selectedStandard === 'aisc') {
                if (aiscBtn) setActiveRightTab('aisc-btn');
            }
        });
    }
    
    // 鋼管規格選擇變更事件 - RC板
    if (steelPipeSpec) {
        steelPipeSpec.addEventListener('change', function() {
            updatePipeSpecValues(this.value);
        });
    }
    
    // 鋼管規格選擇變更事件 - RC梁
    if (steelPipeSpecBeam) {
        steelPipeSpecBeam.addEventListener('change', function() {
            updatePipeSpecValuesBeam(this.value);
        });
    }
    
    // RC板 - 監聽所有輸入欄位變更事件
    if (beamInterval) {
        beamInterval.addEventListener('input', function() {
            updateResultValues();
        });
        
        // 聚焦時清除內容
        beamInterval.addEventListener('focus', function() {
            if (this.value === '') {
                this.placeholder = '';
            }
        });
        
        // 失焦時恢復預設提示（如果沒有輸入內容）
        beamInterval.addEventListener('blur', function() {
            if (this.value === '') {
                this.placeholder = '請輸入數值';
            }
        });
    }
    
    if (supportHeight) {
        supportHeight.addEventListener('input', function() {
            updateResultValues();
        });
        
        // 聚焦時清除內容
        supportHeight.addEventListener('focus', function() {
            if (this.value === '') {
                this.placeholder = '';
            }
        });
        
        // 失焦時恢復預設提示（如果沒有輸入內容）
        supportHeight.addEventListener('blur', function() {
            if (this.value === '') {
                this.placeholder = '請輸入數值';
            }
        });
    }
    
    if (workLoad) {
        workLoad.addEventListener('input', function() {
            updateResultValues();
        });
        
        // 聚焦時清除內容
        workLoad.addEventListener('focus', function() {
            if (this.value === '') {
                this.placeholder = '';
            }
        });
        
        // 失焦時恢復預設提示（如果沒有輸入內容）
        workLoad.addEventListener('blur', function() {
            if (this.value === '') {
                this.placeholder = '請輸入數值';
            }
        });
    }
    
    if (plateThickness) {
        plateThickness.addEventListener('input', function() {
            updateResultValues();
        });
        
        // 聚焦時清除內容
        plateThickness.addEventListener('focus', function() {
            if (this.value === '') {
                this.placeholder = '';
            }
        });
        
        // 失焦時恢復預設提示（如果沒有輸入內容）
        plateThickness.addEventListener('blur', function() {
            if (this.value === '') {
                this.placeholder = '請輸入數值';
            }
        });
    }
    
    if (testStrength) {
        testStrength.addEventListener('input', function() {
            updateResultValues();
        });
        
        // 聚焦時清除內容
        testStrength.addEventListener('focus', function() {
            if (this.value === '') {
                this.placeholder = '';
            }
        });
        
        // 失焦時恢復預設提示（如果沒有輸入內容）
        testStrength.addEventListener('blur', function() {
            if (this.value === '') {
                this.placeholder = '請輸入數值';
            }
        });
    }
    
    // RC梁 - 監聽所有輸入欄位變更事件
    if (beamSupportCount) {
        beamSupportCount.addEventListener('input', function() {
            updateResultValuesBeam();
        });
        
        // 聚焦時清除內容
        beamSupportCount.addEventListener('focus', function() {
            if (this.value === '') {
                this.placeholder = '';
            }
        });
        
        // 失焦時恢復預設提示（如果沒有輸入內容）
        beamSupportCount.addEventListener('blur', function() {
            if (this.value === '') {
                this.placeholder = '請輸入數值';
            }
        });
    }
    
    if (supportHeightBeam) {
        supportHeightBeam.addEventListener('input', function() {
            updateResultValuesBeam();
        });
        
        // 聚焦時清除內容
        supportHeightBeam.addEventListener('focus', function() {
            if (this.value === '') {
                this.placeholder = '';
            }
        });
        
        // 失焦時恢復預設提示（如果沒有輸入內容）
        supportHeightBeam.addEventListener('blur', function() {
            if (this.value === '') {
                this.placeholder = '請輸入數值';
            }
        });
    }
    
    if (workLoadBeam) {
        workLoadBeam.addEventListener('input', function() {
            updateResultValuesBeam();
        });
        
        // 聚焦時清除內容
        workLoadBeam.addEventListener('focus', function() {
            if (this.value === '') {
                this.placeholder = '';
            }
        });
        
        // 失焦時恢復預設提示（如果沒有輸入內容）
        workLoadBeam.addEventListener('blur', function() {
            if (this.value === '') {
                this.placeholder = '請輸入數值';
            }
        });
    }
    
    if (plateThicknessBeam) {
        plateThicknessBeam.addEventListener('input', function() {
            updateResultValuesBeam();
        });
        
        // 聚焦時清除內容
        plateThicknessBeam.addEventListener('focus', function() {
            if (this.value === '') {
                this.placeholder = '';
            }
        });
        
        // 失焦時恢復預設提示（如果沒有輸入內容）
        plateThicknessBeam.addEventListener('blur', function() {
            if (this.value === '') {
                this.placeholder = '請輸入數值';
            }
        });
    }
    
    if (testStrengthBeam) {
        testStrengthBeam.addEventListener('input', function() {
            updateResultValuesBeam();
        });
        
        // 聚焦時清除內容
        testStrengthBeam.addEventListener('focus', function() {
            if (this.value === '') {
                this.placeholder = '';
            }
        });
        
        // 失焦時恢復預設提示（如果沒有輸入內容）
        testStrengthBeam.addEventListener('blur', function() {
            if (this.value === '') {
                this.placeholder = '請輸入數值';
            }
        });
    }
    
    // 移動版選單開關
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('show');
        });
    }
    
    // 登入按鈕點擊事件
    document.querySelectorAll('.login-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            alert('登入功能將在未來版本推出，敬請期待！');
        });
    });
    
    // 訂閱按鈕點擊事件
    document.querySelectorAll('.subscribe-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            alert('訂閱功能將在未來版本推出，敬請期待！');
        });
    });
    
    // 聯絡我們點擊事件
    document.querySelectorAll('.contact-us').forEach(function(link) {
        link.addEventListener('click', function(event) {
            if (!link.hasAttribute('href')) {
                event.preventDefault();
                window.location.href = 'mailto:cpeydnote@gmail.com';
            }
        });
    });
    
    // 更新日誌按鈕點擊事件
    document.querySelectorAll('.changelog-link').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const changelogPopup = document.getElementById('changelog-popup');
            if (changelogPopup) {
                changelogPopup.style.display = 'block';
            }
        });
    });
    
    // 關閉彈出視窗按鈕點擊事件
    const closePopup = document.querySelector('.close-popup');
    if (closePopup) {
        closePopup.addEventListener('click', function() {
            const changelogPopup = document.getElementById('changelog-popup');
            if (changelogPopup) {
                changelogPopup.style.display = 'none';
            }
        });
    }
    
    // 點擊彈出視窗外部時關閉
    window.addEventListener('click', function(event) {
        const changelogPopup = document.getElementById('changelog-popup');
        if (event.target == changelogPopup) {
            changelogPopup.style.display = 'none';
        }
    });
    
    // 函數：根據選定的鋼管規格更新參數值 - RC板
    function updatePipeSpecValues(specType) {
        let specA, specB, specC, materialText;
        
        if (specType === 'A36') {
            specA = '2.5';
            specB = '4.86';
            specC = '0.25';
            materialText = 'A36';
        } else if (specType === 'STK500') {
            specA = '3.5';
            specB = '4.86';
            specC = '0.25';
            materialText = 'STK500';
        } else {
            // 預設值或空值
            specA = '';
            specB = '';
            specC = '';
            materialText = '';
        }
        
        // 更新顯示值
        const specAElement = document.getElementById('spec-a');
        const specBElement = document.getElementById('spec-b');
        const specCElement = document.getElementById('spec-c');
        
        // 更新規格數值 - 直接顯示值或空白，移除「請選擇規格」預設文字
        if (specAElement) specAElement.textContent = specA;
        if (specBElement) specBElement.textContent = specB;
        if (specCElement) specCElement.textContent = specC;
        
        // 更新 G. Tube 圖上的數值
        if (bDimensionValue) {
            if (specB) {
                bDimensionValue.textContent = specB;
                bDimensionValue.style.display = 'block';
            } else {
                bDimensionValue.style.display = 'none';
            }
        }
        
        if (cDimensionValue) {
            if (specC) {
                cDimensionValue.textContent = specC;
                cDimensionValue.style.display = 'block';
            } else {
                cDimensionValue.style.display = 'none';
            }
        }
        
        // 更新材料標籤
        if (materialLabel) {
            if (materialText) {
                materialLabel.textContent = materialText;
                materialLabel.style.display = 'block';
            } else {
                materialLabel.style.display = 'none';
            }
        }
    }
    
    // 函數：根據選定的鋼管規格更新參數值 - RC梁
    function updatePipeSpecValuesBeam(specType) {
        let specA, specB, specC, materialText;
        
        if (specType === 'A36') {
            specA = '2.5';
            specB = '4.86';
            specC = '0.25';
            materialText = 'A36';
        } else if (specType === 'STK500') {
            specA = '3.5';
            specB = '4.86';
            specC = '0.25';
            materialText = 'STK500';
        } else {
            // 預設值或空值
            specA = '';
            specB = '';
            specC = '';
            materialText = '';
        }
        
        // 更新顯示值
        const specAElement = document.getElementById('spec-a-beam');
        const specBElement = document.getElementById('spec-b-beam');
        const specCElement = document.getElementById('spec-c-beam');
        
        // 更新規格數值 - 直接顯示值或空白，移除「請選擇規格」預設文字
        if (specAElement) specAElement.textContent = specA;
        if (specBElement) specBElement.textContent = specB;
        if (specCElement) specCElement.textContent = specC;
        
        // 更新 G. Tube 圖上的數值
        if (bDimensionValueBeam) {
            if (specB) {
                bDimensionValueBeam.textContent = specB;
                bDimensionValueBeam.style.display = 'block';
            } else {
                bDimensionValueBeam.style.display = 'none';
            }
        }
        
        if (cDimensionValueBeam) {
            if (specC) {
                cDimensionValueBeam.textContent = specC;
                cDimensionValueBeam.style.display = 'block';
            } else {
                cDimensionValueBeam.style.display = 'none';
            }
        }
        
        // 更新材料標籤
        if (materialLabelBeam) {
            if (materialText) {
                materialLabelBeam.textContent = materialText;
                materialLabelBeam.style.display = 'block';
            } else {
                materialLabelBeam.style.display = 'none';
            }
        }
    }
    
    // 函數：設置輸入欄位預設提示文字 - RC板
    function setPlaceholders() {
        // 為所有數值輸入欄位添加預設提示文字
        if (beamInterval) beamInterval.placeholder = '請輸入數值';
        if (workLoad) workLoad.placeholder = '請輸入數值';
        if (plateThickness) plateThickness.placeholder = '請輸入數值';
        if (supportHeight) supportHeight.placeholder = '請輸入數值';
        if (testStrength) testStrength.placeholder = '請輸入數值';
        
        // 為鋼管規格下拉選單添加預設選項
        if (steelPipeSpec && steelPipeSpec.options.length > 0) {
            // 檢查是否已有預設選項
            if (steelPipeSpec.options[0].value !== '') {
                // 創建新的預設選項
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.text = '請選擇規格';
                defaultOption.disabled = true;
                defaultOption.selected = true;
                
                // 將預設選項添加到下拉選單的開頭
                steelPipeSpec.insertBefore(defaultOption, steelPipeSpec.firstChild);
            }
        }
    }
    
    // 函數：設置輸入欄位預設提示文字 - RC梁
    function setPlaceholdersBeam() {
        // 為所有數值輸入欄位添加預設提示文字
        if (beamSupportCount) beamSupportCount.placeholder = '請輸入數值';
        if (workLoadBeam) workLoadBeam.placeholder = '請輸入數值';
        if (plateThicknessBeam) plateThicknessBeam.placeholder = '請輸入數值';
        if (supportHeightBeam) supportHeightBeam.placeholder = '請輸入數值';
        if (testStrengthBeam) testStrengthBeam.placeholder = '請輸入數值';
        
        // 為鋼管規格下拉選單添加預設選項
        if (steelPipeSpecBeam && steelPipeSpecBeam.options.length > 0) {
            // 檢查是否已有預設選項
            if (steelPipeSpecBeam.options[0].value !== '') {
                // 創建新的預設選項
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.text = '請選擇規格';
                defaultOption.disabled = true;
                defaultOption.selected = true;
                
                // 將預設選項添加到下拉選單的開頭
                steelPipeSpecBeam.insertBefore(defaultOption, steelPipeSpecBeam.firstChild);
            }
        }
    }
    
    // 函數：更新結果值及支撐示意圖 - RC板
    function updateResultValues() {
        // 更新大引間隔顯示
        if (beamInterval && beamInterval.value) {
            // 用戶有輸入值，顯示在結果區
            if (valueE) valueE.textContent = beamInterval.value;
        } else {
            // 用戶沒有輸入值，不顯示任何內容
            if (valueE) valueE.textContent = '';
        }
        
        // 暫時設定固定值95
        // 備註：未來會根據多個輸入參數計算支撐間距
        // 計算公式會考慮：
        // 1. 大引間隔 (beamInterval.value)
        // 2. 施工活載重 (workLoad.value)
        // 3. 板厚 (plateThickness.value)
        // 4. 支撐淨高 (supportHeight.value)
        // 5. 鋼管規格 (steelPipeSpec.value)
        // 6. 降伏強度、外徑、管厚等參數
        // TODO: 未來將加入計算公式，取代固定值95
        if (valueF) {
            if (beamInterval && beamInterval.value) {
                valueF.textContent = '95';
            } else {
                valueF.textContent = '';
            }
        }
        
        // 更新支撐結構示意圖上的數值
        updateSupportImage();
    }
    
    // 函數：更新結果值及支撐示意圖 - RC梁
    function updateResultValuesBeam() {
        // 更新負擔支數顯示
        if (beamSupportCount && beamSupportCount.value) {
            // 用戶有輸入值，顯示在結果區
            if (valueEBeam) valueEBeam.textContent = beamSupportCount.value + ' 支';
        } else {
            // 用戶沒有輸入值，不顯示任何內容
            if (valueEBeam) valueEBeam.textContent = '';
        }
        
        // 暫時設定固定值95
        // 備註：未來會根據多個輸入參數計算支撐間距
        if (valueFBeam) {
            if (beamSupportCount && beamSupportCount.value) {
                valueFBeam.textContent = '95';
            } else {
                valueFBeam.textContent = '';
            }
        }
        
        // 更新支撐結構示意圖上的數值
        updateSupportImageBeam();
    }
    
    // 函數：更新支撐結構示意圖上的數值 - RC板
    function updateSupportImage() {
        // 尋找顯示大引間隔的元素
        const beamIntervalDisplay = document.querySelector('#rc-plate-content .support-image-container .beam-interval-display');
        if (beamIntervalDisplay) {
            if (beamInterval && beamInterval.value) {
                beamIntervalDisplay.textContent = beamInterval.value;
                beamIntervalDisplay.style.display = 'block';
            } else {
                beamIntervalDisplay.style.display = 'none';
            }
        }
        
        // 尋找顯示支撐淨高的元素
        const supportHeightDisplay = document.querySelector('#rc-plate-content .support-image-container .support-height-display');
        if (supportHeightDisplay) {
            if (supportHeight && supportHeight.value) {
                supportHeightDisplay.textContent = supportHeight.value;
                supportHeightDisplay.style.display = 'block';
            } else {
                supportHeightDisplay.style.display = 'none';
            }
        }
        
        // 尋找顯示施工活載重的元素
        const workLoadDisplay = document.querySelector('#rc-plate-content .support-image-container .work-load-display');
        if (workLoadDisplay) {
            if (workLoad && workLoad.value) {
                workLoadDisplay.textContent = workLoad.value + ' kgf/cm²';
                workLoadDisplay.style.display = 'block';
            } else {
                workLoadDisplay.style.display = 'none';
            }
        }
        
        // 新增：尋找顯示板厚的元素
        const plateThicknessDisplay = document.querySelector('#rc-plate-content .support-image-container .plate-thickness-display');
        if (plateThicknessDisplay) {
            if (plateThickness && plateThickness.value) {
                plateThicknessDisplay.textContent = plateThickness.value;
                plateThicknessDisplay.style.display = 'block';
            } else {
                plateThicknessDisplay.style.display = 'none';
            }
        }
    }
    
    // 函數：更新支撐結構示意圖上的數值 - RC梁
    function updateSupportImageBeam() {
        // 尋找顯示負擔支數的元素
        const beamSupportCountDisplay = document.querySelector('#rc-beam-content .support-image-container .beam-interval-display');
        if (beamSupportCountDisplay) {
            if (beamSupportCount && beamSupportCount.value) {
                beamSupportCountDisplay.textContent = beamSupportCount.value + '支';
                beamSupportCountDisplay.style.display = 'block';
            } else {
                beamSupportCountDisplay.style.display = 'none';
            }
        }
        
        // 尋找顯示支撐淨高的元素
        const supportHeightDisplayBeam = document.querySelector('#rc-beam-content .support-image-container .support-height-display');
        if (supportHeightDisplayBeam) {
            if (supportHeightBeam && supportHeightBeam.value) {
                supportHeightDisplayBeam.textContent = supportHeightBeam.value;
                supportHeightDisplayBeam.style.display = 'block';
            } else {
                supportHeightDisplayBeam.style.display = 'none';
            }
        }
        
        // 尋找顯示施工活載重的元素
        const workLoadDisplayBeam = document.querySelector('#rc-beam-content .support-image-container .work-load-display');
        if (workLoadDisplayBeam) {
            if (workLoadBeam && workLoadBeam.value) {
                workLoadDisplayBeam.textContent = workLoadBeam.value + ' kgf/cm²';
                workLoadDisplayBeam.style.display = 'block';
            } else {
                workLoadDisplayBeam.style.display = 'none';
            }
        }
        
        // 尋找顯示板厚的元素
        const plateThicknessDisplayBeam = document.querySelector('#rc-beam-content .support-image-container .plate-thickness-display');
        if (plateThicknessDisplayBeam) {
            if (plateThicknessBeam && plateThicknessBeam.value) {
                plateThicknessDisplayBeam.textContent = plateThicknessBeam.value;
                plateThicknessDisplayBeam.style.display = 'block';
            } else {
                plateThicknessDisplayBeam.style.display = 'none';
            }
        }
    }
    
    // 函數：切換主要內容區域
    function setActiveContent(contentId) {
        // 隱藏所有內容
        const contents = document.querySelectorAll('.calculator-content');
        contents.forEach(function(content) {
            content.classList.add('hidden');
        });
        
        // 顯示選定的內容
        const activeContent = document.getElementById(contentId);
        if (activeContent) activeContent.classList.remove('hidden');
        
        // 同步移動版下拉選單
        if (mobileTypeDropdown) {
            if (contentId === 'rc-plate-content') {
                mobileTypeDropdown.value = 'rc-plate';
            } else if (contentId === 'rc-beam-content') {
                mobileTypeDropdown.value = 'rc-beam';
            } else if (contentId === 'steel-plate-content') {
                mobileTypeDropdown.value = 'steel-plate';
            }
        }
    }
    
    // 函數：設置左側活動標籤
    function setActiveTab(tabId) {
        const leftTabs = document.querySelectorAll('.left-tab-buttons .tab-btn');
        leftTabs.forEach(function(tab) {
            if (tab.id === tabId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }
    
    // 函數：設置右側標籤的活動狀態
    function setActiveRightTab(tabId) {
        const rightTabs = document.querySelectorAll('.right-tab-buttons .tab-btn');
        rightTabs.forEach(function(tab) {
            if (tab.id === tabId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // 同步移動版規範下拉選單
        if (mobileStandardDropdown) {
            if (tabId === 't99-asd-btn') {
                mobileStandardDropdown.value = 't99-asd';
            } else if (tabId === 'aisc-btn') {
                mobileStandardDropdown.value = 'aisc';
            }
        }
    }
    
    // 初始化執行
    updateResultValues();
    if (document.getElementById('rc-beam-content')) {
        updateResultValuesBeam();
    }
});
