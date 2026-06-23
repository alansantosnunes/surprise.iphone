import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  StatusBar,
  Platform,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function App() {
  const [answered, setAnswered] = useState(false);
  const fadeIn = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(1)).current;

  // Position do botão "Não" — começa centralizado
  const noButtonX = useRef(new Animated.Value(0)).current;
  const noButtonY = useRef(new Animated.Value(0)).current;

  const handleYes = () => {
    Animated.sequence([
      Animated.timing(cardScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(cardScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setAnswered(true);
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleNoHover = () => {
    // Move o botão para uma posição aleatória na tela
    const maxX = SCREEN_WIDTH * 0.3;
    const maxY = SCREEN_HEIGHT * 0.25;

    const randomX = (Math.random() - 0.5) * maxX * 2;
    const randomY = (Math.random() - 0.5) * maxY * 2;

    Animated.spring(noButtonX, {
      toValue: randomX,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();

    Animated.spring(noButtonY, {
      toValue: randomY,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6EB4" />

      <Animated.View style={[styles.card, { transform: [{ scale: cardScale }] }]}>
        {!answered ? (
          <View style={styles.questionContainer}>
            <Text style={styles.emoji}>💍</Text>
            <Text style={styles.question}>Quer casar comigo, Gatinha? *-*</Text>

            <View style={styles.buttonsRow}>
              {/* Botão SIM */}
              <TouchableOpacity style={styles.btnYes} onPress={handleYes} activeOpacity={0.8}>
                <Text style={styles.btnYesText}>Sim! 💚</Text>
              </TouchableOpacity>

              {/* Botão NÃO — foge quando tocado */}
              <Animated.View
                style={[
                  styles.btnNoWrapper,
                  {
                    transform: [
                      { translateX: noButtonX },
                      { translateY: noButtonY },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.btnNo}
                  onPress={handleNoHover}
                  onPressIn={handleNoHover}
                  activeOpacity={1}
                >
                  <Text style={styles.btnNoText}>Não ❌</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        ) : (
          <Animated.View style={[styles.answerContainer, { opacity: fadeIn }]}>
            <Image
              source={{
                uri: 'https://img1.picmix.com/output/stamp/normal/5/1/0/1/1171015_f458c.gif',
              }}
              style={styles.gif}
              resizeMode="contain"
            />
            <Text style={styles.answerText}>Eu sabia! 🥰</Text>
            <Text style={styles.answerSub}>Te amo ❤️</Text>
          </Animated.View>
        )}
      </Animated.View>

      {/* Corações flutuantes de fundo */}
      <Text style={[styles.deco, { top: '5%', left: '8%' }]}>💕</Text>
      <Text style={[styles.deco, { top: '10%', right: '10%', fontSize: 24 }]}>🌸</Text>
      <Text style={[styles.deco, { bottom: '8%', left: '12%', fontSize: 20 }]}>💗</Text>
      <Text style={[styles.deco, { bottom: '12%', right: '8%' }]}>✨</Text>
      <Text style={[styles.deco, { top: '20%', left: '3%', fontSize: 18 }]}>🌷</Text>
      <Text style={[styles.deco, { top: '18%', right: '3%', fontSize: 16 }]}>💞</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6EB4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: SCREEN_WIDTH * 0.88,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 48,
    paddingHorizontal: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 10,
    minHeight: 360,
    justifyContent: 'center',
  },

  /* Pergunta */
  questionContainer: {
    alignItems: 'center',
    width: '100%',
  },
  emoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  question: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
    marginBottom: 40,
    lineHeight: 36,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
  },
  btnYes: {
    backgroundColor: '#9AFF9A',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  btnYesText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a5c1a',
  },
  btnNoWrapper: {
    zIndex: 99,
  },
  btnNo: {
    backgroundColor: '#FF4040',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    shadowColor: '#c0392b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  btnNoText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },

  /* Resposta */
  answerContainer: {
    alignItems: 'center',
  },
  gif: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  answerText: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FF6EB4',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  answerSub: {
    fontSize: 28,
    fontWeight: '700',
    color: '#e91e8c',
    marginTop: 8,
  },

  /* Decoração */
  deco: {
    position: 'absolute',
    fontSize: 28,
    opacity: 0.6,
  },
});
