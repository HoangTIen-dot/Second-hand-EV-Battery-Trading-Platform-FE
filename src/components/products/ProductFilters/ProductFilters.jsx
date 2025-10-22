import React, { useState } from "react";
import {
  Card,
  Slider,
  Checkbox,
  Radio,
  Button,
  Space,
  Collapse,
  InputNumber,
  Tag,
  Typography,
} from "antd";
import {
  FilterOutlined,
  ReloadOutlined,
  ThunderboltOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import styles from "./ProductFilters.module.css";

const { Panel } = Collapse;
const { Text } = Typography;

const ProductFilters = ({ onFilterChange, onResetFilters }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1500000000]); // 0 - 1,500 triệu VND (bao gồm xe ô tô điện)
  const [capacityRange, setCapacityRange] = useState([0, 100]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedMemberships, setSelectedMemberships] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [warranty, setWarranty] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);

  const brands = [
    { label: "Tesla", value: "tesla" },
    { label: "Nissan", value: "nissan" },
    { label: "BMW", value: "bmw" },
    { label: "Chevrolet", value: "chevrolet" },
    { label: "Hyundai", value: "hyundai" },
    { label: "Volkswagen", value: "volkswagen" },
    { label: "VinFast", value: "vinfast" },
    { label: "Kia", value: "kia" },
    { label: "MG", value: "mg" },
    { label: "BYD", value: "byd" },
  ];

  const categories = [
    { label: "🔋 Pin điện", value: "battery", color: "#722ed1" },
    { label: "🏍️ Xe máy điện", value: "motorcycle", color: "#1890ff" },
    { label: "🚗 Ô tô điện", value: "car", color: "#52c41a" },
  ];

  const conditions = [
    { label: "Xuất sắc", value: "excellent", color: "green" },
    { label: "Rất tốt", value: "very-good", color: "blue" },
    { label: "Tốt", value: "good", color: "cyan" },
    { label: "Khá", value: "fair", color: "orange" },
  ];

  const membershipTiers = [
    { label: "💎 Kim cương", value: 4, color: "#667eea" },
    { label: "🥇 Vàng", value: 3, color: "#f093fb" },
    { label: "🥈 Bạc", value: 2, color: "#4facfe" },
    { label: "🥉 Đồng", value: 1, color: "#fa709a" },
  ];

  const locations = [
    { label: "TP. Hồ Chí Minh", value: "TP. Hồ Chí Minh" },
    { label: "Hà Nội", value: "Hà Nội" },
    { label: "Đà Nẵng", value: "Đà Nẵng" },
    { label: "Cần Thơ", value: "Cần Thơ" },
    { label: "Hải Phòng", value: "Hải Phòng" },
    { label: "Biên Hòa", value: "Biên Hòa" },
    { label: "Nha Trang", value: "Nha Trang" },
    { label: "Huế", value: "Huế" },
  ];

  const warrantyOptions = [
    { label: "Tất cả", value: "all" },
    { label: "1+ Năm", value: "1" },
    { label: "2+ Năm", value: "2" },
    { label: "3+ Năm", value: "3" },
  ];

  const handleApplyFilters = () => {
    const filters = {
      categories: selectedCategories,
      priceRange,
      capacityRange,
      brands: selectedBrands,
      conditions: selectedConditions,
      memberships: selectedMemberships,
      locations: selectedLocations,
      warranty,
      inStockOnly,
    };
    onFilterChange(filters);
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1500000000]);
    setCapacityRange([0, 100]);
    setSelectedBrands([]);
    setSelectedConditions([]);
    setSelectedMemberships([]);
    setSelectedLocations([]);
    setWarranty("all");
    setInStockOnly(false);
    onResetFilters();
  };

  const activeFiltersCount = 
    selectedCategories.length +
    selectedBrands.length +
    selectedConditions.length +
    selectedMemberships.length +
    selectedLocations.length +
    (warranty !== "all" ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  return (
    <Card className={styles.filtersCard}>
      <div className={styles.filterHeader}>
        <h3 className={styles.filterTitle}>
          <FilterOutlined /> Bộ lọc
        </h3>
        {activeFiltersCount > 0 && (
          <Tag color="blue">{activeFiltersCount} đang áp dụng</Tag>
        )}
      </div>

      <Collapse
        defaultActiveKey={["category", "price", "capacity", "brands", "membership", "location", "condition"]}
        ghost
        expandIconPosition="end"
      >
        {/* Category Filter */}
        <Panel header={<span className={styles.panelHeader}>🔍 Loại sản phẩm</span>} key="category">
          <Checkbox.Group
            value={selectedCategories}
            onChange={setSelectedCategories}
            className={styles.checkboxGroup}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {categories.map((category) => (
                <div key={category.value} className={styles.checkboxItem}>
                  <Checkbox value={category.value}>
                    <span style={{ fontWeight: 500, fontSize: "14px" }}>
                      {category.label}
                    </span>
                  </Checkbox>
                </div>
              ))}
            </Space>
          </Checkbox.Group>
          
        </Panel>

        {/* Price Range */}
        <Panel header={<span className={styles.panelHeader}><DollarOutlined /> Khoảng giá</span>} key="price">
          <div className={styles.rangeFilter}>
            <Slider
              range
              min={0}
              max={99999999999}
              step={50000000}
              value={priceRange}
              onChange={setPriceRange}
              tooltip={{ formatter: (value) => `${(value / 1000000).toFixed(0)}tr ₫` }}
            />
            <div className={styles.rangeInputs}>
              <InputNumber
                addonAfter="₫"
                value={priceRange[0]}
                onChange={(value) => setPriceRange([value, priceRange[1]])}
                min={0}
                max={priceRange[1]}
                style={{ width: "100%" }}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
              <span>—</span>
              <InputNumber
                addonAfter="₫"
                value={priceRange[1]}
                onChange={(value) => setPriceRange([priceRange[0], value])}
                min={priceRange[0]}
                max={1500000000}
                style={{ width: "100%" }}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
            </div>
          </div>
        </Panel>

        {/* Capacity Range */}
        <Panel header={<span className={styles.panelHeader}><ThunderboltOutlined /> Dung lượng (kWh)</span>} key="capacity">
          <div className={styles.rangeFilter}>
            <Slider
              range
              min={0}
              max={100}
              step={5}
              value={capacityRange}
              onChange={setCapacityRange}
              tooltip={{ formatter: (value) => `${value} kWh` }}
            />
            <div className={styles.rangeInputs}>
              <InputNumber
                suffix="kWh"
                value={capacityRange[0]}
                onChange={(value) => setCapacityRange([value, capacityRange[1]])}
                min={0}
                max={capacityRange[1]}
                style={{ width: "100%" }}
              />
              <span>—</span>
              <InputNumber
                suffix="kWh"
                value={capacityRange[1]}
                onChange={(value) => setCapacityRange([capacityRange[0], value])}
                min={capacityRange[0]}
                max={100}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </Panel>

        {/* Brands */}
        <Panel header={<span className={styles.panelHeader}>🚗 Thương hiệu</span>} key="brands">
          <Checkbox.Group
            value={selectedBrands}
            onChange={setSelectedBrands}
            className={styles.checkboxGroup}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {brands.map((brand) => (
                <div key={brand.value} className={styles.checkboxItem}>
                  <Checkbox value={brand.value}>{brand.label}</Checkbox>
                </div>
              ))}
            </Space>
          </Checkbox.Group>
        </Panel>

        {/* Membership Tiers */}
        <Panel header={<span className={styles.panelHeader}>👑 Gói thành viên</span>} key="membership">
          <Checkbox.Group
            value={selectedMemberships}
            onChange={setSelectedMemberships}
            className={styles.checkboxGroup}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {membershipTiers.map((tier) => (
                <div key={tier.value} className={styles.checkboxItem}>
                  <Checkbox value={tier.value}>
                    <span style={{ color: tier.color, fontWeight: 600 }}>
                      {tier.label}
                    </span>
                  </Checkbox>
                </div>
              ))}
            </Space>
          </Checkbox.Group>
        </Panel>

        {/* Locations */}
        <Panel header={<span className={styles.panelHeader}>📍 Khu vực</span>} key="location">
          <Checkbox.Group
            value={selectedLocations}
            onChange={setSelectedLocations}
            className={styles.checkboxGroup}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {locations.map((location) => (
                <div key={location.value} className={styles.checkboxItem}>
                  <Checkbox value={location.value}>{location.label}</Checkbox>
                </div>
              ))}
            </Space>
          </Checkbox.Group>
        </Panel>

        {/* Condition */}
        <Panel header={<span className={styles.panelHeader}>✨ Tình trạng</span>} key="condition">
          <Checkbox.Group
            value={selectedConditions}
            onChange={setSelectedConditions}
            className={styles.checkboxGroup}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {conditions.map((condition) => (
                <div key={condition.value} className={styles.checkboxItem}>
                  <Checkbox value={condition.value}>
                    <Tag color={condition.color}>{condition.label}</Tag>
                  </Checkbox>
                </div>
              ))}
            </Space>
          </Checkbox.Group>
        </Panel>

        {/* Warranty */}
        <Panel header={<span className={styles.panelHeader}>🛡️ Bảo hành</span>} key="warranty">
          <Radio.Group
            value={warranty}
            onChange={(e) => setWarranty(e.target.value)}
            className={styles.radioGroup}
          >
            <Space direction="vertical">
              {warrantyOptions.map((option) => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Panel>

        {/* Availability */}
        <Panel header={<span className={styles.panelHeader}>📦 Tình trạng hàng</span>} key="availability">
          <Checkbox
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          >
            Chỉ hàng có sẵn
          </Checkbox>
        </Panel>
      </Collapse>

      <div className={styles.filterActions}>
        <Button
          type="primary"
          icon={<FilterOutlined />}
          block
          size="large"
          onClick={handleApplyFilters}
          className={styles.applyButton}
        >
          Áp dụng bộ lọc
        </Button>
        <Button
          icon={<ReloadOutlined />}
          block
          onClick={handleReset}
          className={styles.resetButton}
        >
          Đặt lại tất cả
        </Button>
      </div>
    </Card>
  );
};

export default ProductFilters;
