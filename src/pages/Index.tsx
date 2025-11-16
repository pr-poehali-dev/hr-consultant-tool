import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

type Screen = 
  | 'welcome' 
  | 'onboarding-interests'
  | 'onboarding-skills'
  | 'onboarding-values'
  | 'onboarding-quiz'
  | 'profile'
  | 'chat'
  | 'career-map'
  | 'dashboard';

interface SkillLevel {
  skill: string;
  level: number;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [skillLevels, setSkillLevels] = useState<SkillLevel[]>([
    { skill: 'Backend Development', level: 50 },
    { skill: 'System Design', level: 30 },
    { skill: 'Team Leadership', level: 20 },
    { skill: 'Product Thinking', level: 40 }
  ]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [currentQuizStep, setCurrentQuizStep] = useState(0);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai', text: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [selectedPath, setSelectedPath] = useState<string>('');

  const interests = [
    { id: 'product', name: 'Product', icon: 'Lightbulb' },
    { id: 'data', name: 'Data Science', icon: 'BarChart3' },
    { id: 'design', name: 'Design', icon: 'Palette' },
    { id: 'backend', name: 'Backend', icon: 'Server' },
    { id: 'architecture', name: 'Architecture', icon: 'Building' },
    { id: 'leadership', name: 'Leadership', icon: 'Users' }
  ];

  const values = [
    { id: 'income', name: 'Доход', icon: 'TrendingUp' },
    { id: 'balance', name: 'Баланс', icon: 'Scale' },
    { id: 'impact', name: 'Влияние', icon: 'Zap' },
    { id: 'creativity', name: 'Творчество', icon: 'Sparkles' },
    { id: 'leadership', name: 'Лидерство', icon: 'Crown' },
    { id: 'expertise', name: 'Экспертиза', icon: 'Award' }
  ];

  const quizQuestions = [
    {
      question: 'Как ты решаешь сложные технические задачи?',
      options: [
        'Ищу готовые решения и адаптирую',
        'Анализирую проблему и разрабатываю свой подход',
        'Консультируюсь с коллегами и вырабатываю решение',
        'Делегирую экспертам и координирую процесс'
      ]
    },
    {
      question: 'Как часто коллеги обращаются к тебе за советом?',
      options: [
        'Редко, я чаще учусь у других',
        'Иногда, в моей зоне компетенции',
        'Регулярно, я считаюсь экспертом',
        'Постоянно, я наставник для команды'
      ]
    },
    {
      question: 'Как ты относишься к изменениям в проекте?',
      options: [
        'Выполняю задачи по новым требованиям',
        'Участвую в обсуждении и предлагаю идеи',
        'Инициирую улучшения сам',
        'Формирую стратегию изменений'
      ]
    }
  ];

  const careerPaths = [
    {
      id: 'expert',
      title: 'Экспертный путь',
      subtitle: 'Senior → Lead → Principal Engineer',
      readiness: 68,
      icon: 'Code',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'leadership',
      title: 'Лидерский путь',
      subtitle: 'Team Lead → Engineering Manager',
      readiness: 52,
      icon: 'Users',
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      id: 'product',
      title: 'Продуктовый путь',
      subtitle: 'Tech Lead → Product Manager',
      readiness: 43,
      icon: 'Lightbulb',
      gradient: 'from-orange-500 to-pink-500'
    }
  ];

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(i => i !== id));
    } else if (selectedInterests.length < 3) {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const toggleValue = (id: string) => {
    if (selectedValues.includes(id)) {
      setSelectedValues(selectedValues.filter(v => v !== id));
    } else if (selectedValues.length < 3) {
      setSelectedValues([...selectedValues, id]);
    }
  };

  const updateSkillLevel = (index: number, value: number[]) => {
    const newSkills = [...skillLevels];
    newSkills[index].level = value[0];
    setSkillLevels(newSkills);
  };

  const handleQuizAnswer = (value: string) => {
    setQuizAnswers({ ...quizAnswers, [currentQuizStep]: value });
  };

  const nextQuizStep = () => {
    if (currentQuizStep < quizQuestions.length - 1) {
      setCurrentQuizStep(currentQuizStep + 1);
    } else {
      setCurrentScreen('profile');
    }
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    
    setChatMessages([...chatMessages, { role: 'user', text: chatInput }]);
    
    setTimeout(() => {
      const aiResponses = [
        'На основе твоих ответов вижу сильный технический фундамент. Рекомендую развивать системное мышление и менторские навыки — это кратчайший путь к Lead-позиции.',
        'Твой профиль показывает готовность к росту. Ключевой навык для следующего уровня — умение влиять на архитектурные решения команды.',
        'Ты уже закрываешь 68% требований Senior-роли. Для перехода на Lead нужно взять проект с командой из 3-4 человек.'
      ];
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setChatMessages(prev => [...prev, { role: 'ai', text: randomResponse }]);
    }, 1000);
    
    setChatInput('');
  };

  const handleChatKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {currentScreen === 'welcome' && (
        <div className="container mx-auto px-4 py-20 animate-fade-in">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 mb-6 animate-scale-in">
                <Icon name="Sparkles" className="text-white" size={48} />
              </div>
              <h1 className="text-6xl font-bold text-white mb-6">
                С возвращением!
              </h1>
              <p className="text-2xl text-slate-300 mb-4">
                Готов сделать следующий шаг в карьере?
              </p>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                ИИ-помощник поможет тебе понять текущий уровень, построить карьерный путь и подобрать возможности для роста
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <Card className="p-8 bg-slate-800/50 border-slate-700 backdrop-blur hover:bg-slate-800/70 transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <Icon name="Rocket" className="text-blue-400 group-hover:scale-110 transition-transform" size={40} />
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Новый</Badge>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Начать путешествие</h3>
                <p className="text-slate-400 mb-6">Пройди диагностику и построй свой карьерный путь с нуля</p>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600" 
                  size="lg"
                  onClick={() => setCurrentScreen('onboarding-interests')}
                >
                  Начать
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
              </Card>

              <Card className="p-8 bg-slate-800/50 border-slate-700 backdrop-blur hover:bg-slate-800/70 transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <Icon name="TrendingUp" className="text-violet-400 group-hover:scale-110 transition-transform" size={40} />
                  <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">Прогресс</Badge>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Продолжить путь</h3>
                <p className="text-slate-400 mb-6">Вернуться к карьерному плану и отследить прогресс</p>
                <Button 
                  className="w-full bg-slate-700 hover:bg-slate-600" 
                  size="lg"
                  onClick={() => setCurrentScreen('dashboard')}
                >
                  Открыть дашборд
                  <Icon name="BarChart3" className="ml-2" size={20} />
                </Button>
              </Card>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'onboarding-interests' && (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Progress value={25} className="h-2 mb-4" />
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-3xl font-bold text-white">Выбери сферы, которые тебя зажигают</h2>
                <span className="text-sm text-slate-400">Шаг 1 из 4</span>
              </div>
              <p className="text-slate-400">Выбери от 1 до 3 направлений, в которых хочешь развиваться</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {interests.map((interest) => (
                <Card
                  key={interest.id}
                  className={`p-6 cursor-pointer transition-all ${
                    selectedInterests.includes(interest.id)
                      ? 'bg-gradient-to-br from-blue-500/20 to-violet-500/20 border-blue-500 scale-105'
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                  }`}
                  onClick={() => toggleInterest(interest.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      selectedInterests.includes(interest.id)
                        ? 'bg-blue-500'
                        : 'bg-slate-700'
                    }`}>
                      <Icon name={interest.icon as any} className="text-white" size={28} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{interest.name}</h3>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentScreen('welcome')} className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <Icon name="ArrowLeft" className="mr-2" size={16} />
                Назад
              </Button>
              <Button 
                onClick={() => setCurrentScreen('onboarding-skills')}
                disabled={selectedInterests.length === 0}
                className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
              >
                Далее
                <Icon name="ArrowRight" className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'onboarding-skills' && (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Progress value={50} className="h-2 mb-4" />
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-3xl font-bold text-white">Оцени свои навыки</h2>
                <span className="text-sm text-slate-400">Шаг 2 из 4</span>
              </div>
              <p className="text-slate-400">Двигай слайдеры от новичка до эксперта</p>
            </div>

            <Card className="p-8 bg-slate-800/50 border-slate-700 mb-8">
              <div className="space-y-8">
                {skillLevels.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-3">
                      <span className="text-white font-medium">{skill.skill}</span>
                      <span className="text-slate-400">
                        {skill.level < 30 ? 'Новичок' : skill.level < 60 ? 'Уверенный' : skill.level < 85 ? 'Продвинутый' : 'Эксперт'}
                      </span>
                    </div>
                    <Slider
                      value={[skill.level]}
                      onValueChange={(value) => updateSkillLevel(index, value)}
                      max={100}
                      step={5}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Новичок</span>
                      <span>Эксперт</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentScreen('onboarding-interests')} className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <Icon name="ArrowLeft" className="mr-2" size={16} />
                Назад
              </Button>
              <Button 
                onClick={() => setCurrentScreen('onboarding-values')}
                className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
              >
                Далее
                <Icon name="ArrowRight" className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'onboarding-values' && (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Progress value={75} className="h-2 mb-4" />
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-3xl font-bold text-white">Что для тебя важно?</h2>
                <span className="text-sm text-slate-400">Шаг 3 из 4</span>
              </div>
              <p className="text-slate-400">Выбери до 3 ценностей, которые определяют твой путь</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {values.map((value) => (
                <Card
                  key={value.id}
                  className={`p-6 cursor-pointer transition-all ${
                    selectedValues.includes(value.id)
                      ? 'bg-gradient-to-br from-violet-500/20 to-pink-500/20 border-violet-500 scale-105'
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                  }`}
                  onClick={() => toggleValue(value.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      selectedValues.includes(value.id)
                        ? 'bg-violet-500'
                        : 'bg-slate-700'
                    }`}>
                      <Icon name={value.icon as any} className="text-white" size={28} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{value.name}</h3>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentScreen('onboarding-skills')} className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <Icon name="ArrowLeft" className="mr-2" size={16} />
                Назад
              </Button>
              <Button 
                onClick={() => setCurrentScreen('onboarding-quiz')}
                disabled={selectedValues.length === 0}
                className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
              >
                Далее
                <Icon name="ArrowRight" className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'onboarding-quiz' && (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Progress value={100} className="h-2 mb-4" />
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-3xl font-bold text-white">Мини-квиз на реалистичность</h2>
                <span className="text-sm text-slate-400">Вопрос {currentQuizStep + 1} из {quizQuestions.length}</span>
              </div>
            </div>

            <Card className="p-8 bg-slate-800/50 border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-6">
                {quizQuestions[currentQuizStep].question}
              </h3>

              <RadioGroup value={quizAnswers[currentQuizStep]} onValueChange={handleQuizAnswer}>
                <div className="space-y-3">
                  {quizQuestions[currentQuizStep].options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 rounded-lg border border-slate-700 hover:border-blue-500 hover:bg-slate-700/30 transition-all cursor-pointer"
                    >
                      <RadioGroupItem value={option} id={`q${currentQuizStep}-option-${index}`} />
                      <Label htmlFor={`q${currentQuizStep}-option-${index}`} className="flex-1 cursor-pointer text-slate-200">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuizStep(Math.max(0, currentQuizStep - 1))}
                  disabled={currentQuizStep === 0}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <Icon name="ArrowLeft" className="mr-2" size={16} />
                  Назад
                </Button>
                <Button
                  onClick={nextQuizStep}
                  disabled={!quizAnswers[currentQuizStep]}
                  className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
                >
                  {currentQuizStep === quizQuestions.length - 1 ? 'Завершить' : 'Далее'}
                  <Icon name="ArrowRight" className="ml-2" size={16} />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {currentScreen === 'profile' && (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Твой профиль готов</h1>
              <p className="text-slate-400 text-lg">ИИ проанализировал твои ответы и построил карьерную карту</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 bg-slate-800/50 border-slate-700 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">68%</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Role Readiness</h3>
                <p className="text-sm text-slate-400">Готовность к Senior-роли</p>
              </Card>

              <Card className="p-6 bg-slate-800/50 border-slate-700 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Карьерных пути</h3>
                <p className="text-sm text-slate-400">Доступно направлений</p>
              </Card>

              <Card className="p-6 bg-slate-800/50 border-slate-700 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">4</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Ключевых навыка</h3>
                <p className="text-sm text-slate-400">Для развития</p>
              </Card>
            </div>

            <Card className="p-8 bg-slate-800/50 border-slate-700 mb-8">
              <h3 className="text-xl font-semibold text-white mb-6">Радар компетенций</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {skillLevels.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-300 font-medium">{skill.skill}</span>
                        <span className="text-blue-400 font-semibold">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 border-2 border-blue-500/50 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-white mb-2">B+</div>
                        <div className="text-slate-400">Уровень компетенций</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                onClick={() => setCurrentScreen('chat')}
                className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
              >
                <Icon name="MessageCircle" className="mr-2" size={20} />
                Обсудить с ИИ
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setCurrentScreen('career-map')}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <Icon name="Map" className="mr-2" size={20} />
                Карьерный путь
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'chat' && (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-white mb-2">Диалог с ИИ-консультантом</h1>
              <p className="text-slate-400">Задай вопросы о своём развитии и получи персональные рекомендации</p>
            </div>

            <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
              <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-slate-900/30">
                {chatMessages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center mx-auto mb-4">
                      <Icon name="Bot" className="text-white" size={40} />
                    </div>
                    <p className="text-slate-400 mb-6">Начни диалог с одного из вопросов</p>
                    <div className="space-y-2 max-w-md mx-auto">
                      <Button
                        variant="outline"
                        className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800"
                        onClick={() => setChatInput('Почему я не расту?')}
                      >
                        💭 Почему я не расту?
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800"
                        onClick={() => setChatInput('Какая роль мне подходит?')}
                      >
                        🎯 Какая роль мне подходит?
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800"
                        onClick={() => setChatInput('Что развить в первую очередь?')}
                      >
                        📈 Что развить в первую очередь?
                      </Button>
                    </div>
                  </div>
                )}

                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
                  >
                    <div
                      className={`max-w-[75%] p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white'
                          : 'bg-slate-800 border border-slate-700 text-slate-200'
                      }`}
                    >
                      {message.role === 'ai' && (
                        <div className="flex items-center mb-2">
                          <Icon name="Sparkles" className="mr-2 text-blue-400" size={16} />
                          <span className="text-xs font-semibold text-blue-400">ИИ-консультант</span>
                        </div>
                      )}
                      <p>{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-800/50 border-t border-slate-700">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Напиши свой вопрос..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleChatKey}
                    className="flex-1 min-h-[60px] bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 resize-none"
                  />
                  <Button
                    onClick={sendChatMessage}
                    disabled={!chatInput.trim()}
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
                  >
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </Card>

            <div className="mt-6 flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentScreen('profile')}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <Icon name="User" className="mr-2" size={16} />
                К профилю
              </Button>
              <Button
                onClick={() => setCurrentScreen('career-map')}
                className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
              >
                Построить карьерный путь
                <Icon name="ArrowRight" className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'career-map' && (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Карта карьерного пути</h1>
              <p className="text-slate-400 text-lg">ИИ подобрал оптимальные траектории на основе твоего профиля</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {careerPaths.map((path) => (
                <Card
                  key={path.id}
                  className={`p-6 cursor-pointer transition-all ${
                    selectedPath === path.id
                      ? 'bg-slate-800/80 border-blue-500 scale-105 shadow-xl shadow-blue-500/20'
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                  }`}
                  onClick={() => setSelectedPath(path.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${path.gradient} flex items-center justify-center`}>
                      <Icon name={path.icon as any} className="text-white" size={24} />
                    </div>
                    {selectedPath === path.id && (
                      <Icon name="CheckCircle2" className="text-blue-500" size={24} />
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{path.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{path.subtitle}</p>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-400">Готовность</span>
                      <span className="text-sm font-bold text-blue-400">{path.readiness}%</span>
                    </div>
                    <Progress value={path.readiness} className="h-2" />
                  </div>

                  <div className={`text-xs font-semibold ${
                    path.readiness >= 60 ? 'text-green-400' : path.readiness >= 40 ? 'text-yellow-400' : 'text-orange-400'
                  }`}>
                    {path.readiness >= 60 ? '✓ Высокая готовность' : path.readiness >= 40 ? '→ Средняя готовность' : '⟳ Требуется развитие'}
                  </div>
                </Card>
              ))}
            </div>

            {selectedPath && (
              <Card className="p-8 bg-slate-800/50 border-slate-700 animate-scale-in">
                <h2 className="text-2xl font-bold text-white mb-8">Персональный план развития (IDP)</h2>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/30">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <Icon name="BookOpen" className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">1. Обучение</h3>
                      <p className="text-slate-300 mb-2">Пройди модуль "System Design Fundamentals"</p>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Icon name="Clock" size={14} />
                        <span>2 недели</span>
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 ml-2">Приоритет</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-r from-violet-500/10 to-violet-500/5 border border-violet-500/30">
                    <div className="w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0">
                      <Icon name="Code" className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">2. Практика</h3>
                      <p className="text-slate-300 mb-2">Возьми задачу по архитектуре нового микросервиса</p>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Icon name="Target" size={14} />
                        <span>Применение в проекте</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/30">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <Icon name="Users" className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">3. Обратная связь</h3>
                      <p className="text-slate-300 mb-2">Запроси фидбек у Lead Engineer после код-ревью</p>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Icon name="MessageSquare" size={14} />
                        <span>Встреча 1:1</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button size="lg" className="flex-1 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600">
                    <Icon name="Save" className="mr-2" size={16} />
                    Сохранить план
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setCurrentScreen('dashboard')}
                    className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    <Icon name="BarChart3" className="mr-2" size={16} />
                    Открыть дашборд
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}

      {currentScreen === 'dashboard' && (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Дашборд развития</h1>
                <p className="text-slate-400">Твой прогресс и карьерные индикаторы</p>
              </div>
              <Button onClick={() => setCurrentScreen('welcome')} variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <Icon name="Home" className="mr-2" size={16} />
                На главную
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="TrendingUp" className="text-blue-400" size={24} />
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">+12%</Badge>
                </div>
                <div className="text-3xl font-bold text-white mb-1">68%</div>
                <div className="text-sm text-slate-400">Role Readiness Index</div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-violet-500/10 to-violet-500/5 border-violet-500/30">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Award" className="text-violet-400" size={24} />
                  <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">HiPo</Badge>
                </div>
                <div className="text-3xl font-bold text-white mb-1">A-</div>
                <div className="text-sm text-slate-400">Индекс компетенций</div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="CheckCircle2" className="text-green-400" size={24} />
                  <span className="text-xs text-slate-400">3 из 5</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">60%</div>
                <div className="text-sm text-slate-400">Прогресс IDP</div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/30">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Zap" className="text-orange-400" size={24} />
                  <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">Топ 10%</Badge>
                </div>
                <div className="text-3xl font-bold text-white mb-1">128</div>
                <div className="text-sm text-slate-400">Динамика роста</div>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-6">Milestones</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium mb-1">Системный дизайн освоен</div>
                      <div className="text-sm text-slate-400">Завершён модуль и применён на проекте</div>
                      <div className="text-xs text-green-400 mt-1">Разблокировано: Lead-проекты</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 animate-pulse">
                      <Icon name="Target" className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium mb-1">Код-ревью с Lead</div>
                      <div className="text-sm text-slate-400">В процессе • Запланировано на эту неделю</div>
                      <Progress value={70} className="h-1 mt-2" />
                    </div>
                  </div>

                  <div className="flex items-start gap-4 opacity-50">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                      <Icon name="Lock" className="text-slate-500" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="text-slate-400 font-medium mb-1">Менторство Junior-dev</div>
                      <div className="text-sm text-slate-500">Будет доступно после код-ревью</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-6">Рекомендации ИИ</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                    <div className="flex items-start gap-3">
                      <Icon name="Lightbulb" className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <div className="text-white font-medium mb-1">Внутренний проект</div>
                        <div className="text-sm text-slate-300">Platform Team ищет Senior для архитектуры API Gateway</div>
                        <Button size="sm" className="mt-2 bg-blue-500 hover:bg-blue-600">
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-violet-500/10 border border-violet-500/30">
                    <div className="flex items-start gap-3">
                      <Icon name="Users" className="text-violet-400 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <div className="text-white font-medium mb-1">Найден ментор</div>
                        <div className="text-sm text-slate-300">Алексей Иванов (Principal) готов к менторству по архитектуре</div>
                        <Button size="sm" variant="outline" className="mt-2 border-violet-500/30 text-violet-300 hover:bg-violet-500/10">
                          Связаться
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <div className="flex items-start gap-3">
                      <Icon name="BookOpen" className="text-green-400 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <div className="text-white font-medium mb-1">Новый курс</div>
                        <div className="text-sm text-slate-300">"Advanced Microservices" — следующий шаг после System Design</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-8 bg-gradient-to-br from-slate-800/80 to-slate-800/40 border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Карьерный статус</h3>
                  <p className="text-slate-400">Ты показываешь рост выше среднего по компании</p>
                </div>
                <Badge className="bg-gradient-to-r from-blue-500 to-violet-500 text-white border-0 px-4 py-2 text-base">
                  HiPo • Готов к повышению
                </Badge>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">Топ 10%</div>
                  <div className="text-sm text-slate-400">по динамике развития</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-violet-400 mb-2">+18%</div>
                  <div className="text-sm text-slate-400">рост за квартал</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">2 мес</div>
                  <div className="text-sm text-slate-400">до готовности Senior</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
