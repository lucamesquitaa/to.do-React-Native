import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  interface Task {
    id: number;
    title: string;
    done: boolean;
  }

  function handleAddTask(newTaskTitle: string) {
    const list = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    if(!tasks){
      return;
    }
    setTasks(oldState => [...oldState, list])
    
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const task = updatedTasks.find(a => a.id === id);
    if(task){
      task.done = !task.done;
      setTasks(updatedTasks);
    }
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => (oldState.filter(
      task => task.id != id 
    )));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})