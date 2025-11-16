import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

type Screen = 
  | 'home' 
  | 'welcome' 
  | 'diagnostic' 
  | 'analysis' 
  | 'paths' 
  | 'chat';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [diagnosticStep, setDiagnosticStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedPath, setSelectedPath] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai', text: string }>>([]);
  const [chatInput, setChatInput] = useState('');

  const diagnosticQuestions = [
    {
      question: 'В каком направлении хочешь развиваться в ближайшие 1–2 года?',
      options: [
        'Экспертное развитие (углубление в технологию)',
        'Лидерство и управление командой',
        'Продуктовое направление',
        'Смена специализации'
      ]
    },
    {
      question: 'Какие задачи дают тебе энергию?',
      options: [
        'Сложные технические задачи',
        'Коммуникация и координация',
        'Стратегическое планирование',
        'Наставничество и обучение'
      ]
    },
    {
      question: 'Какие навыки считаешь сильными?',
      options: [
        'Технические (программирование, архитектура)',
        'Коммуникативные (презентации, переговоры)',
        'Аналитические (данные, метрики)',
        'Креативные (дизайн, инновации)'
      ]
    },
    {
      question: 'Что сейчас мешает росту?',
      options: [
        'Недостаток знаний в определённой области',
        'Отсутствие подходящих проектов',
        'Нехватка времени на развитие',
        'Неясность карьерного пути'
      ]
    }
  ];

  const careerPaths = [
    {
      id: 'expert',
      title: 'Экспертный путь',
      subtitle: 'Senior → Lead → Principal',
      readiness: 78,
      keySkills: ['Системный дизайн', 'Менторинг'],
      icon: 'Microscope'
    },
    {
      id: 'leadership',
      title: 'Лидерский путь',
      subtitle: 'Team Lead → Engineering Manager',
      readiness: 62,
      keySkills: ['Управление людьми', 'Стратегия'],
      icon: 'Users'
    },
    {
      id: 'product',
      title: 'Продуктовое направление',
      subtitle: 'Tech Lead → Product Manager',
      readiness: 45,
      keySkills: ['Product Vision', 'Аналитика'],
      icon: 'Lightbulb'
    }
  ];

  const skillsData = [
    { name: 'Технические навыки', value: 85, color: 'bg-blue-500' },
    { name: 'Коммуникация', value: 72, color: 'bg-green-500' },
    { name: 'Лидерство', value: 58, color: 'bg-yellow-500' },
    { name: 'Стратегическое мышление', value: 65, color: 'bg-purple-500' }
  ];

  const handleDiagnosticAnswer = (value: string) => {
    setAnswers({ ...answers, [diagnosticStep]: value });
  };

  const nextDiagnosticStep = () => {
    if (diagnosticStep < diagnosticQuestions.length - 1) {
      setDiagnosticStep(diagnosticStep + 1);
    } else {
      setCurrentScreen('analysis');
    }
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    
    setChatMessages([...chatMessages, { role: 'user', text: chatInput }]);
    
    setTimeout(() => {
      const aiResponses = [
        'Для перехода на следующий уровень рекомендую сфокусироваться на системном дизайне и менторинге. Это даст максимальный рост.',
        'Твои технические навыки уже на высоком уровне. Сейчас важно развивать soft skills для лидерской роли.',
        'Предлагаю начать с проекта, где сможешь применить новые навыки. Есть подходящая вакансия в команде Platform.'
      ];
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setChatMessages(prev => [...prev, { role: 'ai', text: randomResponse }]);
    }, 800);
    
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {currentScreen === 'home' && (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-slate-900 mb-4">HR Консультант</h1>
              <p className="text-xl text-slate-600 mb-2">Твой персональный ИИ-помощник по карьерному развитию</p>
              <p className="text-lg text-slate-500">Поможем за 5 минут понять твой текущий уровень, карьерные направления и ближайшие шаги развития</p>
            </div>

            <Card className="p-8 mb-8 bg-white shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-slate-900">Как это работает</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="ClipboardList" className="text-primary" size={32} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">1. Быстрая диагностика</h3>
                  <p className="text-sm text-slate-600">Ответь на 4 вопроса о твоих целях и предпочтениях</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="BarChart3" className="text-primary" size={32} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">2. Анализ навыков</h3>
                  <p className="text-sm text-slate-600">ИИ оценит твои сильные стороны и зоны роста</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="TrendingUp" className="text-primary" size={32} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">3. Персональный план</h3>
                  <p className="text-sm text-slate-600">Получи карьерный путь и конкретные шаги развития</p>
                </div>
              </div>
            </Card>

            <div className="text-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => setCurrentScreen('welcome')}
              >
                Начать диагностику
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'welcome' && (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <Card className="p-12 text-center bg-white shadow-lg">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Bot" className="text-primary" size={48} />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-slate-900">Привет! Я твой HR-консультант</h2>
              <p className="text-lg text-slate-600 mb-6">
                Я помогу определить твои сильные стороны, подходящие карьерные пути и ближайшие шаги развития.
              </p>
              <p className="text-slate-500 mb-8">
                Процесс займёт около 5 минут. Отвечай честно — это поможет дать максимально точные рекомендации.
              </p>
              <Button 
                size="lg"
                onClick={() => setCurrentScreen('diagnostic')}
              >
                Начать
              </Button>
            </Card>
          </div>
        </div>
      )}

      {currentScreen === 'diagnostic' && (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-600">Вопрос {diagnosticStep + 1} из {diagnosticQuestions.length}</span>
                <span className="text-sm font-semibold text-primary">{Math.round(((diagnosticStep + 1) / diagnosticQuestions.length) * 100)}%</span>
              </div>
              <Progress value={((diagnosticStep + 1) / diagnosticQuestions.length) * 100} />
            </div>

            <Card className="p-8 bg-white shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-slate-900">
                {diagnosticQuestions[diagnosticStep].question}
              </h2>
              
              <RadioGroup value={answers[diagnosticStep]} onValueChange={handleDiagnosticAnswer}>
                <div className="space-y-3">
                  {diagnosticQuestions[diagnosticStep].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => setDiagnosticStep(Math.max(0, diagnosticStep - 1))}
                  disabled={diagnosticStep === 0}
                >
                  <Icon name="ArrowLeft" className="mr-2" size={16} />
                  Назад
                </Button>
                <Button 
                  onClick={nextDiagnosticStep}
                  disabled={!answers[diagnosticStep]}
                >
                  {diagnosticStep === diagnosticQuestions.length - 1 ? 'Завершить' : 'Далее'}
                  <Icon name="ArrowRight" className="ml-2" size={16} />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {currentScreen === 'analysis' && (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Анализ твоих навыков</h1>
              <p className="text-lg text-slate-600">ИИ собрал информацию из твоих проектов, задач и оценок</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="p-6 bg-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900">Role Readiness Index</h3>
                  <Icon name="Target" className="text-primary" size={24} />
                </div>
                <div className="text-center py-8">
                  <div className="text-6xl font-bold text-primary mb-2">78%</div>
                  <p className="text-slate-600">Готовность к текущей роли</p>
                  <Badge className="mt-4" variant="outline">Развитие выше нормы</Badge>
                </div>
              </Card>

              <Card className="p-6 bg-white shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-slate-900">Компетенции</h3>
                <div className="space-y-4">
                  {skillsData.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                        <span className="text-sm font-semibold text-primary">{skill.value}%</span>
                      </div>
                      <Progress value={skill.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="p-6 mb-6 bg-white shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center mb-3">
                    <Icon name="TrendingUp" className="text-green-600 mr-2" size={24} />
                    <h3 className="text-lg font-semibold text-slate-900">Сильные стороны</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Icon name="Check" className="text-green-600 mr-2 mt-1" size={16} />
                      <span className="text-slate-700">Технические навыки на уровне Senior</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" className="text-green-600 mr-2 mt-1" size={16} />
                      <span className="text-slate-700">Эффективная коммуникация в команде</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" className="text-green-600 mr-2 mt-1" size={16} />
                      <span className="text-slate-700">Системное мышление при решении задач</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center mb-3">
                    <Icon name="Target" className="text-yellow-600 mr-2" size={24} />
                    <h3 className="text-lg font-semibold text-slate-900">Зоны роста</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Icon name="ArrowUpRight" className="text-yellow-600 mr-2 mt-1" size={16} />
                      <span className="text-slate-700">Лидерские навыки и делегирование</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="ArrowUpRight" className="text-yellow-600 mr-2 mt-1" size={16} />
                      <span className="text-slate-700">Стратегическое планирование</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <div className="text-center">
              <Button 
                size="lg"
                onClick={() => setCurrentScreen('paths')}
              >
                Посмотреть карьерные пути
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'paths' && (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Карьерные направления</h1>
              <p className="text-lg text-slate-600">ИИ подобрал оптимальные пути развития на основе твоих ответов</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {careerPaths.map((path) => (
                <Card 
                  key={path.id}
                  className={`p-6 cursor-pointer transition-all hover:shadow-xl ${selectedPath === path.id ? 'ring-2 ring-primary bg-primary/5' : 'bg-white'}`}
                  onClick={() => setSelectedPath(path.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon name={path.icon as any} className="text-primary" size={32} />
                    {selectedPath === path.id && <Icon name="CheckCircle2" className="text-primary" size={24} />}
                  </div>
                  <h3 className="text-xl font-semibold mb-1 text-slate-900">{path.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{path.subtitle}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-slate-600">Готовность</span>
                      <span className="text-sm font-semibold text-primary">{path.readiness}%</span>
                    </div>
                    <Progress value={path.readiness} className="h-2" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-600 mb-2">Ключевые навыки для роста:</p>
                    <div className="flex flex-wrap gap-2">
                      {path.keySkills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {selectedPath && (
              <Card className="p-8 bg-white shadow-lg animate-slide-up">
                <h2 className="text-2xl font-semibold mb-6 text-slate-900">Персональная траектория развития</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-900">Индивидуальный план развития (IDP)</h3>
                  <div className="space-y-4">
                    <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Icon name="BookOpen" className="text-blue-600 mr-3 mt-1" size={20} />
                      <div>
                        <p className="font-semibold text-slate-900 mb-1">Обучение: Системный дизайн</p>
                        <p className="text-sm text-slate-600">Пройди короткий модуль "System Design Fundamentals" (2 недели)</p>
                      </div>
                    </div>
                    <div className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
                      <Icon name="Code" className="text-green-600 mr-3 mt-1" size={20} />
                      <div>
                        <p className="font-semibold text-slate-900 mb-1">Практика: Применение в проекте</p>
                        <p className="text-sm text-slate-600">Возьми задачу по архитектуре нового сервиса в текущем проекте</p>
                      </div>
                    </div>
                    <div className="flex items-start p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <Icon name="MessageSquare" className="text-purple-600 mr-3 mt-1" size={20} />
                      <div>
                        <p className="font-semibold text-slate-900 mb-1">Обратная связь: Менторинг</p>
                        <p className="text-sm text-slate-600">Запроси фидбек у Lead Engineer после код-ревью</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button size="lg" className="flex-1">
                    <Icon name="Save" className="mr-2" size={16} />
                    Сохранить план
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setCurrentScreen('chat')}>
                    <Icon name="MessageCircle" className="mr-2" size={16} />
                    Обсудить с ИИ
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}

      {currentScreen === 'chat' && (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Чат с ИИ-консультантом</h1>
              <p className="text-lg text-slate-600">Задай любой вопрос о карьерном развитии</p>
            </div>

            <Card className="bg-white shadow-lg overflow-hidden">
              <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-slate-50">
                {chatMessages.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="MessageCircle" className="mx-auto mb-4 text-slate-400" size={48} />
                    <p className="text-slate-500">Начни диалог с вопроса</p>
                    <div className="mt-6 space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => setChatInput('Почему я не расту?')}
                      >
                        Почему я не расту?
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => setChatInput('Какую роль выбрать?')}
                      >
                        Какую роль выбрать?
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => setChatInput('Что развивать в первую очередь?')}
                      >
                        Что развивать в первую очередь?
                      </Button>
                    </div>
                  </div>
                )}
                
                {chatMessages.map((message, index) => (
                  <div 
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-primary text-white' 
                        : 'bg-white border border-slate-200'
                    }`}>
                      {message.role === 'ai' && (
                        <div className="flex items-center mb-2">
                          <Icon name="Bot" className="mr-2 text-primary" size={16} />
                          <span className="text-xs font-semibold text-slate-600">HR Консультант</span>
                        </div>
                      )}
                      <p className={message.role === 'user' ? 'text-white' : 'text-slate-700'}>
                        {message.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white border-t">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Напиши свой вопрос..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendChatMessage();
                      }
                    }}
                    className="flex-1 min-h-[60px]"
                  />
                  <Button 
                    onClick={sendChatMessage}
                    disabled={!chatInput.trim()}
                    size="lg"
                  >
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </Card>

            <div className="mt-6 text-center">
              <Button 
                variant="outline"
                onClick={() => setCurrentScreen('home')}
              >
                <Icon name="Home" className="mr-2" size={16} />
                На главную
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentScreen !== 'home' && (
        <div className="fixed bottom-8 right-8 flex flex-col gap-2">
          <Tabs value={currentScreen} onValueChange={(value) => setCurrentScreen(value as Screen)} className="w-auto">
            <TabsList className="flex-col h-auto bg-white shadow-lg">
              <TabsTrigger value="home" className="w-full justify-start">
                <Icon name="Home" className="mr-2" size={16} />
                Главная
              </TabsTrigger>
              <TabsTrigger value="analysis" className="w-full justify-start">
                <Icon name="BarChart3" className="mr-2" size={16} />
                Анализ
              </TabsTrigger>
              <TabsTrigger value="paths" className="w-full justify-start">
                <Icon name="TrendingUp" className="mr-2" size={16} />
                Пути
              </TabsTrigger>
              <TabsTrigger value="chat" className="w-full justify-start">
                <Icon name="MessageCircle" className="mr-2" size={16} />
                Чат
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Index;
