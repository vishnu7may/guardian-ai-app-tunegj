
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/styles/commonStyles';

interface ActivityChartProps {
  data: { hour: number; activity: number }[];
  title: string;
}

export default function ActivityChart({ data, title }: ActivityChartProps) {
  const maxActivity = Math.max(...data.map(d => d.activity), 1);
  const chartWidth = Dimensions.get('window').width - 64;
  const barWidth = chartWidth / data.length - 4;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chart}>
        {data.map((item, index) => {
          const height = (item.activity / maxActivity) * 100;
          return (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: `${height}%`,
                      width: barWidth,
                      backgroundColor: colors.primary,
                    }
                  ]} 
                />
              </View>
              <Text style={styles.label}>{item.hour}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    minHeight: 4,
  },
  label: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
