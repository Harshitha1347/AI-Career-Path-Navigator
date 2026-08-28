'use client';

import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Lock,
  Clock,
  BookOpen,
  Code2,
  Video,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';

type TaskStatus = 'completed' | 'available' | 'locked';
type TaskType = 'video' | 'reading' | 'coding' | 'quiz';

interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  duration: string;
  xp: number;
  status: TaskStatus;
  stage: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const fallbackTasks: Task[] = [
  {
    id: 'fallback-1',
    title: 'Learn the Fundamentals',
    description: 'Study the fundamental concepts required for your selected career.',
    type: 'reading',
    duration: '45 min',
    xp: 100,
    status: 'available',
    stage: 'Beginner',
    difficulty: 'Beginner',
  },
  {
    id: 'fallback-2',
    title: 'Practice Core Skills',
    description: 'Practice the important skills needed for your career path.',
    type: 'coding',
    duration: '60 min',
    xp: 150,
    status: 'available',
    stage: 'Beginner',
    difficulty: 'Beginner',
  },
];

const typeConfig: Record<
  TaskType,
  {
    icon: React.ElementType;
    color: string;
    bg: string;
    label: string;
  }
> = {
  video: {
    icon: Video,
    color: 'text-neon-pink',
    bg: 'rgba(244,114,182,0.15)',
    label: 'Video',
  },
  reading: {
    icon: BookOpen,
    color: 'text-neon-cyan',
    bg: 'rgba(6,182,212,0.15)',
    label: 'Reading',
  },
  coding: {
    icon: Code2,
    color: 'text-neon-violet',
    bg: 'rgba(124,58,237,0.15)',
    label: 'Coding',
  },
  quiz: {
    icon: CheckCircle2,
    color: 'text-neon-amber',
    bg: 'rgba(251,191,36,0.15)',
    label: 'Quiz',
  },
};

const difficultyColor: Record<string, string> = {
  Beginner: 'text-neon-green',
  Intermediate: 'text-neon-cyan',
  Advanced: 'text-neon-pink',
};

export default function TodayTaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskStates, setTaskStates] = useState<Record<string, TaskStatus>>({});

  useEffect(() => {
    const storedRoadmap = localStorage.getItem('roadmap');

    if (!storedRoadmap) {
      setTasks(fallbackTasks);
      setTaskStates(
        Object.fromEntries(
          fallbackTasks.map((task) => [task.id, task.status]),
        ),
      );
      return;
    }

    try {
      const roadmap = JSON.parse(storedRoadmap);

      if (!Array.isArray(roadmap) || roadmap.length === 0) {
        setTasks(fallbackTasks);
        setTaskStates(
          Object.fromEntries(
            fallbackTasks.map((task) => [task.id, task.status]),
          ),
        );
        return;
      }

      const dynamicTasks: Task[] = roadmap.slice(0, 5).map(
        (topic: string, index: number) => {
          const taskTypes: TaskType[] = [
            'video',
            'coding',
            'reading',
            'coding',
            'quiz',
          ];

          const difficulties: Task['difficulty'][] = [
            'Beginner',
            'Beginner',
            'Intermediate',
            'Intermediate',
            'Advanced',
          ];

          const durations = ['30 min', '45 min', '45 min', '60 min', '20 min'];

          const xpValues = [80, 120, 100, 180, 100];

          return {
            id: `ai-task-${index}`,
            title: topic,
            description: `Learn and practice ${topic} as part of your personalized career roadmap.`,
            type: taskTypes[index] || 'reading',
            duration: durations[index] || '45 min',
            xp: xpValues[index] || 100,
            status: index === 0 ? 'available' : index === 1 ? 'available' : 'locked',
            stage: difficulties[index] || 'Intermediate',
            difficulty: difficulties[index] || 'Intermediate',
          };
        },
      );

      setTasks(dynamicTasks);

      setTaskStates(
        Object.fromEntries(
          dynamicTasks.map((task) => [task.id, task.status]),
        ),
      );
    } catch (error) {
      console.error('Failed to load roadmap:', error);

      setTasks(fallbackTasks);

      setTaskStates(
        Object.fromEntries(
          fallbackTasks.map((task) => [task.id, task.status]),
        ),
      );
    }
  }, []);

  const toggleTask = (taskId: string, currentStatus: TaskStatus) => {
    if (currentStatus === 'locked') {
      toast.error('Complete previous tasks to unlock this one');
      return;
    }

    const next =
      currentStatus === 'completed' ? 'available' : 'completed';

    setTaskStates((prev) => ({
      ...prev,
      [taskId]: next,
    }));

    if (next === 'completed') {
      const task = tasks.find((item) => item.id === taskId);

      toast.success(
        `+${task?.xp} XP earned! "${task?.title}" completed 🎉`,
      );
    }
  };

  const completedCount = Object.values(taskStates).filter(
    (status) => status === 'completed',
  ).length;

  const totalXp = tasks
    .filter((task) => taskStates[task.id] === 'completed')
    .reduce((sum, task) => sum + task.xp, 0);

  const maxXp = tasks.reduce((sum, task) => sum + task.xp, 0);

  const progressPercent =
    tasks.length > 0
      ? Math.round((completedCount / tasks.length) * 100)
      : 0;

  const remainingTasks = tasks.filter(
    (task) => taskStates[task.id] === 'available',
  ).length;

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">
            Today's Learning Tasks
          </h3>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">
              {completedCount}/{tasks.length} completed
            </span>

            {totalXp > 0 && (
              <span className="text-xs font-semibold text-neon-violet">
                +{totalXp} XP earned
              </span>
            )}
          </div>
        </div>

        <span className="text-sm font-bold text-neon-violet">
          {progressPercent}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="progress-track h-2 mb-5">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progressPercent}%`,
            background:
              'linear-gradient(90deg, #7C3AED, #06B6D4)',
          }}
        />
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.map((task) => {
          const status = taskStates[task.id] || task.status;

          const typeInfo = typeConfig[task.type];
          const TypeIcon = typeInfo.icon;

          const isCompleted = status === 'completed';
          const isLocked = status === 'locked';

          return (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id, status)}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer group ${
                isCompleted
                  ? 'border-neon-green/20 bg-neon-green/5 opacity-70'
                  : isLocked
                    ? 'border-border opacity-50 cursor-not-allowed'
                    : 'border-border hover:border-primary/40 hover:bg-muted/30'
              }`}
            >
              {/* Status */}
              <div className="flex-shrink-0 mt-0.5">
                {isCompleted ? (
                  <CheckCircle2
                    size={20}
                    className="text-neon-green"
                  />
                ) : isLocked ? (
                  <Lock
                    size={20}
                    className="text-muted-foreground"
                  />
                ) : (
                  <Circle
                    size={20}
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4
                    className={`text-sm font-semibold leading-tight ${
                      isCompleted
                        ? 'line-through text-muted-foreground'
                        : 'text-foreground'
                    }`}
                  >
                    {task.title}
                  </h4>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-xs font-mono text-neon-violet">
                      +{task.xp} XP
                    </span>

                    <ChevronRight
                      size={14}
                      className="text-muted-foreground group-hover:text-foreground transition-colors"
                    />
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                  {task.description}
                </p>

                <div className="flex items-center gap-3 flex-wrap">
                  <div
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded-md"
                    style={{
                      background: typeInfo.bg,
                    }}
                  >
                    <TypeIcon
                      size={11}
                      className={typeInfo.color}
                    />

                    <span
                      className={`text-xs font-medium ${typeInfo.color}`}
                    >
                      {typeInfo.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={11} />
                    {task.duration}
                  </div>

                  <span
                    className={`text-xs font-medium ${difficultyColor[task.difficulty]}`}
                  >
                    {task.difficulty}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily XP Summary */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap
            size={14}
            className="text-neon-violet"
          />

          <span className="text-xs text-muted-foreground">
            Max XP today:
          </span>

          <span className="text-xs font-bold font-mono text-neon-violet">
            {maxXp} XP
          </span>
        </div>

        <span className="text-xs text-muted-foreground">
          {remainingTasks} tasks remaining
        </span>
      </div>
    </div>
  );
}