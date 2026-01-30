import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { theme, spacing, fontSizes, colors, responsiveScale, isWeb, screenWidth, isAndroid } from '../config/theme';

export default function DetailsScreen({ navigation }: any) {
  useEffect(() => {
    console.log('DetailsScreen montado');
    return () => {
      console.log('DetailsScreen desmontado');
    };
  }, []);

  const renderFeature = (icon: React.ReactNode, title: string, description: string) => (
    <View style={styles.featureCard}>
      <View style={styles.featureIcon}>
        {icon}
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <MaterialIcons name="info" size={responsiveScale(40)} color={colors.white} />
        <Text style={styles.headerTitle}>Detalhes do App</Text>
        <Text style={styles.headerSubtitle}>Conheça os recursos disponíveis</Text>
      </View>

      {/* Features */}
      <View style={styles.featuresContainer}>
        {renderFeature(
          <MaterialIcons name="security" size={responsiveScale(24)} color={colors.primary} />,
          'Autenticação Segura',
          'Integração completa com Firebase para segurança máxima'
        )}

        {renderFeature(
          <MaterialIcons name="storage" size={responsiveScale(24)} color={colors.success} />,
          'Dados em Tempo Real',
          'Firestore sincroniza seus dados em tempo real'
        )}

        {renderFeature(
          <MaterialIcons name="phone-iphone" size={responsiveScale(24)} color={colors.warning} />,
          'Interface Responsiva',
          'Design adaptável para todos os tamanhos de tela'
        )}

        {renderFeature(
          <MaterialIcons name="palette" size={responsiveScale(24)} color="#E94B3C" />,
          'UI Moderna',
          'Interface intuitiva e visualmente atraente'
        )}
      </View>

      {/* Tech Stack */}
      <View style={styles.techStackContainer}>
        <Text style={styles.sectionTitle}>Tecnologias Utilizadas</Text>
        
        <View style={styles.techGrid}>
          <View style={styles.techItem}>
            <FontAwesome name="react" size={responsiveScale(28)} color={colors.primary} />
            <Text style={styles.techName}>React Native</Text>
          </View>
          
          <View style={styles.techItem}>
            <MaterialIcons name="cloud" size={responsiveScale(28)} color={colors.success} />
            <Text style={styles.techName}>Firebase</Text>
          </View>
          
          <View style={styles.techItem}>
            <MaterialIcons name="navigation" size={responsiveScale(28)} color={colors.warning} />
            <Text style={styles.techName}>React Navigation</Text>
          </View>
          
          <View style={styles.techItem}>
            <MaterialIcons name="code" size={responsiveScale(28)} color="#7C3AED" />
            <Text style={styles.techName}>TypeScript</Text>
          </View>
        </View>
      </View>

      {/* Info Box */}
      <View style={styles.infoBox}>
        <MaterialIcons name="lightbulb" size={responsiveScale(20)} color={colors.primary} />
        <Text style={styles.infoText}>
          Este aplicativo demonstra as melhores práticas de desenvolvimento mobile com React Native
        </Text>
      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <MaterialIcons name="arrow-back" size={responsiveScale(20)} color={colors.white} />
        <Text style={styles.backButtonText}>Voltar para Início</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
    alignItems: isWeb ? 'center' : 'stretch',
  },
  headerContainer: {
    backgroundColor: colors.primary,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    borderBottomLeftRadius: responsiveScale(12),
    borderBottomRightRadius: responsiveScale(12),
    width: isWeb ? Math.min(500, screenWidth * 0.9) : '100%',
    alignSelf: isWeb ? 'center' : 'auto',
  },
  headerTitle: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: spacing.sm,
  },
  headerSubtitle: {
    fontSize: fontSizes.xs,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: spacing.xs,
  },
  featuresContainer: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    gap: spacing.sm,
    width: isWeb ? Math.min(500, screenWidth * 0.9) : '100%',
    alignSelf: isWeb ? 'center' : 'auto',
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: responsiveScale(10),
    padding: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  featureIcon: {
    width: responsiveScale(35),
    height: responsiveScale(35),
    borderRadius: responsiveScale(18),
    backgroundColor: colors.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  featureContent: {
    flex: 1,
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: fontSizes.sm,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
  },
  techStackContainer: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
    width: isWeb ? Math.min(500, screenWidth * 0.9) : '100%',
    alignSelf: isWeb ? 'center' : undefined,
  },
  sectionTitle: {
    fontSize: fontSizes.md,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    justifyContent: 'space-around',
    marginBottom: spacing.md,
  },
  techItem: {
    width: '45%',
    backgroundColor: colors.white,
    borderRadius: responsiveScale(10),
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  techName: {
    fontSize: fontSizes.xs,
    color: colors.text,
    marginTop: spacing.xs,
    fontWeight: '500',
    textAlign: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: responsiveScale(8),
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    width: isWeb ? Math.min(500, screenWidth * 0.9) : '100%',
    alignSelf: isWeb ? 'center' : undefined,
  },
  infoText: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: responsiveScale(10),
    gap: spacing.xs,
    width: isWeb ? Math.min(500, screenWidth * 0.9) : isAndroid ? Math.min(300, screenWidth * 0.8) : '100%',
    alignSelf: isWeb ? 'center' : isAndroid ? 'center' : undefined,
  },
  backButtonText: {
    fontSize: fontSizes.sm,
    fontWeight: 'bold',
    color: colors.white,
  },
});
