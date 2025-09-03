# To-Do List App

A cross-platform To-Do List application built with React Native and Expo, featuring task management, due dates, notifications, and a modern UI.

## Features

- **Add, update, and delete tasks**
- **Set due dates for tasks**
- **Mark tasks as completed**
- **Delete all completed tasks**
- **Sort tasks by due date**
- **Local notifications for unfinished tasks**
- **Responsive and clean UI**
- **Error and loading states handling**

## Design Overview

- **Component-Based Architecture:**  
  The app is organized into reusable components for tasks, buttons, modals, loaders, and error messages.
- **State Management:**  
  Uses React hooks (`useState`, `useEffect`, `useCallback`) for local state and [React Query](https://tanstack.com/query/latest) for data fetching and caching.
- **API Integration:**  
  Fetches initial tasks from [dummyjson.com/todos](https://dummyjson.com/todos) via Axios ([`getTodos`](utils/my-api.js)).
- **Notifications:**  
  Integrates Expo Notifications to remind users of unfinished tasks.
- **UI/UX:**  
  Styled with React Native's `StyleSheet`, featuring a header, main board, floating add button, modals for adding/updating tasks, and error/loading screens.
- **Performance Optimization with FlatList:**  
  The app uses React Native's `FlatList` component for rendering the task list.  
  Key FlatList properties such as `keyExtractor`, `initialNumToRender`, `windowSize`, and `removeClippedSubviews` are configured to optimize rendering performance, reduce memory usage, and ensure smooth scrolling even with large numbers of tasks.

## Project Structure

```
├── App.js
├── index.js
├── app.json
├── package.json
├── .gitignore
├── assets/
│   └── (icons, splash images)
├── components/
│   ├── common/
│   │   ├── buttons/
│   │   │   └── AddTaskButton.js
│   │   ├── errors/
│   │   │   └── ErrorMessage.js
│   │   ├── loaders/
│   │   │   └── Loading.js
│   │   └── modals/
│   │       ├── AddTaskModal.js
│   │       └── UpdateTaskModal.js
│   └── tasks/
│       ├── TaskItem.js
│       └── TaskList.js
├── screens/
│   ├── Header.js
│   └── MainBoard.js
└── utils/
    └── my-api.js
```

## How It Works

- **App Entry:**  
  [`index.js`](index.js) registers the root component ([`App`](App.js)).
- **Main UI:**  
  [`App.js`](App.js) renders the header and main board inside a safe area, providing the React Query client.
- **Task Management:**  
  [`MainBoard`](screens/MainBoard.js) fetches tasks and handles loading/error states.  
  [`TaskList`](components/tasks/TaskList.js) manages local task state, sorting, notifications, and modals for adding/updating tasks.
- **Modals:**  
  [`AddTaskModal`](components/common/modals/AddTaskModal.js) and [`UpdateTaskModal`](components/common/modals/UpdateTaskModal.js) handle task creation and editing.
- **Notifications:**  
  Expo Notifications are triggered for unfinished tasks.

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the app:**
   ```sh
   npx expo start
   ```
3. **Connect to the phone**

   Download the Expo GO APP and scan the code

## Dependencies

- React Native
- Expo
- Axios
- @tanstack/react-query
- date-fns
- expo-notifications
- @react-native-community/datetimepicker
- expo-checkbox

## Customization

- **API Endpoint:**  
  Change the endpoint in [`getTodos`](utils/my-api.js) for your own backend.
- **UI Styles:**  
  Modify styles in each component for custom themes.

  ## Challenges

- **State Synchronization:**  
  Ensuring that local state updates (such as adding, updating, or deleting tasks) remain consistent with data fetched from the API.
- **Notification Scheduling:**  
  Handling notification permissions and scheduling reminders for unfinished tasks across different platforms.
- **Performance Optimization:**  
  Tuning FlatList properties and minimizing unnecessary re-renders to maintain smooth UI performance with large datasets.

## More to Explore

- **Cloud Sync:**  
  Integrate with cloud services to sync tasks across multiple devices.
- **User Authentication:**  
  Add user accounts and secure login functionality.
- **Recurring Tasks:**  
  Support for tasks that repeat on a schedule.
- **Customizable Notifications:**  
  Allow users to set custom notification times and sounds.
- **Themes and Personalization:**  
  Enable users to choose different color themes or layouts.
- **Analytics:**  
  Track task completion rates and provide productivity insights.
- **Localization:**  
  Add support for multiple languages to reach a wider audience.

## Demo Link

https://drive.google.com/file/d/11Lj3OU1qc04-MzcOHLE8j8DHxsLW_XHm/view?usp=drive_link

## License

This project is private and for demo purposes.

---

**Author:**  
Xingyuan GU (Nancy)
