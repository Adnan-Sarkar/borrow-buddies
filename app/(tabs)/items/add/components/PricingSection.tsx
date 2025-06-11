import React from "react";
import { View, Text } from "react-native";
import type { Control } from "react-hook-form";
import CustomInput from "../../../../../components/common/CustomInput";

type PricingSectionProps = {
  control: Control<any>;
  errors: any;
};

const PricingSection: React.FC<PricingSectionProps> = ({ control, errors }) => {
  return (
    <View className="mb-2">
      <View className="flex-row mb-2">
        <View className="flex-1 mr-2">
          <CustomInput
            label="Daily Rate"
            placeholder="0.00"
            name="dailyPrice"
            control={control}
            error={errors.dailyPrice}
            keyboardType="decimal-pad"
            showIcon={false}
            rules={{
              required: "Daily rate is required",
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message: "Enter a valid price (e.g. 10.99)",
              },
            }}
          />
        </View>
        <View className="flex-1 ml-2">
          <CustomInput
            label="Security Deposit (optional)"
            placeholder="0.00"
            name="securityDeposit"
            control={control}
            error={errors.securityDeposit}
            keyboardType="decimal-pad"
            showIcon={false}
            rules={{
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message: "Enter a valid amount (e.g. 50.00)",
              },
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PricingSection;
