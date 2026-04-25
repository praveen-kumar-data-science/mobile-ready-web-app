import { Express, Request, Response } from 'express';
import * as habitService from '../services/habitService';

export function setHabitRoutes(app: Express): void {
  // Get all habits
  app.get('/api/habits', (_req: Request, res: Response) => {
    res.status(200).json(habitService.getAllHabits());
  });

  // Get single habit
  app.get('/api/habits/:id', (req: Request, res: Response) => {
    const habit = habitService.getHabit(parseInt(req.params.id));
    if (habit) {
      res.status(200).json(habit);
    } else {
      res.status(404).json({ error: 'Habit not found' });
    }
  });

  // Create habit
  app.post('/api/habits', (req: Request, res: Response) => {
    try {
      const { name, description, frequency, color, emoji, action, cue, identity, reminderTime, reminderMessage } = req.body;
      const nextAction = String(action || name || '').trim();
      const nextCue = String(cue || '').trim();
      const nextIdentity = String(identity || '').trim();

      if (!nextAction || !nextCue || !nextIdentity || !frequency || !color) {
        res.status(400).json({ error: 'Action, time or location, identity, frequency, and color are required' });
        return;
      }

      const nextDescription = String(description || `I will ${nextAction}, ${nextCue} so that I can become ${nextIdentity} I want to be.`).trim();

      const habit = habitService.createHabit({
        name: String(name || nextAction).trim(),
        description: nextDescription,
        action: nextAction,
        cue: nextCue,
        identity: nextIdentity,
        reminderTime: reminderTime || undefined,
        reminderMessage: reminderMessage || undefined,
        frequency,
        color,
        emoji: emoji || '🎯',
      });
      res.status(201).json(habit);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create habit' });
    }
  });

  // Update habit
  app.put('/api/habits/:id', (req: Request, res: Response) => {
    try {
      const { name, description, frequency, color, emoji, action, cue, identity, reminderTime, reminderMessage } = req.body;
      const nextAction = String(action || name || '').trim();
      const nextCue = String(cue || '').trim();
      const nextIdentity = String(identity || '').trim();

      if (!nextAction || !nextCue || !nextIdentity || !frequency || !color) {
        res.status(400).json({ error: 'Action, time or location, identity, frequency, and color are required' });
        return;
      }

      const nextDescription = String(description || `I will ${nextAction}, ${nextCue} so that I can become ${nextIdentity} I want to be.`).trim();

      const habit = habitService.updateHabit(parseInt(req.params.id), {
        name: String(name || nextAction).trim(),
        description: nextDescription,
        action: nextAction,
        cue: nextCue,
        identity: nextIdentity,
        reminderTime: reminderTime || undefined,
        reminderMessage: reminderMessage || undefined,
        frequency,
        color,
        emoji: emoji || '🎯',
      });
      if (habit) {
        res.status(200).json(habit);
      } else {
        res.status(404).json({ error: 'Habit not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update habit' });
    }
  });

  // Delete habit
  app.delete('/api/habits/:id', (req: Request, res: Response) => {
    if (habitService.deleteHabit(parseInt(req.params.id))) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Habit not found' });
    }
  });

  // Log completion
  app.post('/api/habits/:id/complete', (req: Request, res: Response) => {
    try {
      const { date } = req.body;
      if (!date) {
        res.status(400).json({ error: 'Date is required' });
        return;
      }
      const habit = habitService.logHabitCompletion(parseInt(req.params.id), date);
      if (habit) {
        res.status(200).json(habit);
      } else {
        res.status(404).json({ error: 'Habit not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to log completion' });
    }
  });

  // Remove completion
  app.delete('/api/habits/:id/complete', (req: Request, res: Response) => {
    try {
      const { date } = req.body;
      if (!date) {
        res.status(400).json({ error: 'Date is required' });
        return;
      }
      const habit = habitService.removeHabitCompletion(parseInt(req.params.id), date);
      if (habit) {
        res.status(200).json(habit);
      } else {
        res.status(404).json({ error: 'Habit not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove completion' });
    }
  });
}
