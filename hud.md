{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;\f1\fnil\fcharset0 Menlo-Bold;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue255;\red255\green255\blue254;\red0\green0\blue0;
\red144\green1\blue18;\red15\green112\blue1;\red14\green110\blue109;\red19\green118\blue70;\red0\green0\blue117;
}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c100000;\cssrgb\c100000\c100000\c99608;\cssrgb\c0\c0\c0;
\cssrgb\c63922\c8235\c8235;\cssrgb\c0\c50196\c0;\cssrgb\c0\c50196\c50196;\cssrgb\c3529\c52549\c34510;\cssrgb\c0\c6667\c53333;
}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs28 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 # Odyssey HUD 2026 - Frontend Development Prompt\cf0 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 ## Project Overview\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 Build a personalized RPG-style dashboard frontend to track my journey becoming a Multi-Platform Architect in 2026. This is a gamified learning tracker with XP systems, quest logging, and quarterly boss fights (projects). 
\f1\b **This prompt focuses on frontend development only with a complete mock API layer - no real database or backend integration.**
\f0\b0 \cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 ## Core Product Requirements\cf0 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 ### Must-Have Features\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 1. 
\f1\b \cf0 \strokec4 **Authentication System**
\f0\b0  - Login/logout with mock JWT token\cb1 \
\cf2 \cb3 \strokec2 2. 
\f1\b \cf0 \strokec4 **Stat Block**
\f0\b0  - Visual display of 4 skill categories: Backend, Frontend, Mobile, DevOps\cb1 \
\cf2 \cb3 \strokec2 3. 
\f1\b \cf0 \strokec4 **Quest Log**
\f0\b0  - Daily entry system to log learning hours and activities\cb1 \
\cf2 \cb3 \strokec2 4. 
\f1\b \cf0 \strokec4 **Boss Tracker**
\f0\b0  - Progress visualization for quarterly main projects\cb1 \
\cf2 \cb3 \strokec2 5. 
\f1\b \cf0 \strokec4 **Leveling Engine**
\f0\b0  - Automatic level calculation based on total hours (client-side state)\cb1 \
\cf2 \cb3 \strokec2 6. 
\f1\b \cf0 \strokec4 **Archive**
\f0\b0  - Repository of completed projects with GitHub/deployment links\cb1 \
\
\cf2 \cb3 \strokec2 ## Technical Stack\cf0 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 ### Framework & Libraries\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - 
\f1\b \cf0 \strokec4 **Next.js 15**
\f0\b0  (App Router)\cb1 \
\cf2 \cb3 \strokec2 - 
\f1\b \cf0 \strokec4 **React 19**
\f0\b0  (with hooks for state management)\cb1 \
\cf2 \cb3 \strokec2 - 
\f1\b \cf0 \strokec4 **Tailwind CSS**
\f0\b0  (Styling)\cb1 \
\cf2 \cb3 \strokec2 - 
\f1\b \cf0 \strokec4 **Shadcn UI**
\f0\b0  (Component library)\cb1 \
\cf2 \cb3 \strokec2 - 
\f1\b \cf0 \strokec4 **Framer Motion**
\f0\b0  (Animations)\cb1 \
\cf2 \cb3 \strokec2 - 
\f1\b \cf0 \strokec4 **Lucide React**
\f0\b0  (Icons)\cb1 \
\cf2 \cb3 \strokec2 - 
\f1\b \cf0 \strokec4 **React Hook Form + Zod**
\f0\b0  (Form handling & validation)\cb1 \
\cf2 \cb3 \strokec2 - 
\f1\b \cf0 \strokec4 **Local Storage**
\f0\b0  (Token + data persistence)\cb1 \
\
\cf2 \cb3 \strokec2 ### State Management\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 React useState/useReducer for component state\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Optimistic UI updates for better UX\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Local Storage for auth token and data persistence\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Mock API layer simulating real backend responses\cb1 \
\
\cf2 \cb3 \strokec2 ## Data Models (TypeScript Interfaces)\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```typescript\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // API Response Types (snake_case)\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 interface\cf0 \strokec4  \cf7 \strokec7 ApiResponse\cf0 \strokec4 <\cf7 \strokec7 T\cf0 \strokec4 > \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   success: \cf2 \strokec2 boolean\cf0 \strokec4 ;\cb1 \
\cb3   data?: \cf7 \strokec7 T\cf0 \strokec4 ;\cb1 \
\cb3   error?: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   validation_errors?: \cf7 \strokec7 Record\cf0 \strokec4 <\cf2 \strokec2 string\cf0 \strokec4 , \cf2 \strokec2 string\cf0 \strokec4 >;\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 interface\cf0 \strokec4  \cf7 \strokec7 AuthResponse\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   token: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   user: \{\cb1 \
\cb3     user_id: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3     email: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3     username: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   \};\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 interface\cf0 \strokec4  \cf7 \strokec7 ProfileData\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   user_id: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   username: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   avatar_url: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   total_xp: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   current_level: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   created_at: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 interface\cf0 \strokec4  \cf7 \strokec7 QuestData\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   quest_id: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   created_at: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   title: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   description?: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   duration_min: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   category: \cf5 \strokec5 'BACKEND'\cf0 \strokec4  | \cf5 \strokec5 'FRONTEND'\cf0 \strokec4  | \cf5 \strokec5 'MOBILE'\cf0 \strokec4  | \cf5 \strokec5 'DEVOPS'\cf0 \strokec4 ;\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 interface\cf0 \strokec4  \cf7 \strokec7 BossData\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   boss_id: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   title: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   quarter: \cf8 \strokec8 1\cf0 \strokec4  | \cf8 \strokec8 2\cf0 \strokec4  | \cf8 \strokec8 3\cf0 \strokec4  | \cf8 \strokec8 4\cf0 \strokec4 ;\cb1 \
\cb3   status: \cf5 \strokec5 'LOCKED'\cf0 \strokec4  | \cf5 \strokec5 'ACTIVE'\cf0 \strokec4  | \cf5 \strokec5 'COMPLETED'\cf0 \strokec4  | \cf5 \strokec5 'FAILED'\cf0 \strokec4 ;\cb1 \
\cb3   progress: \cf2 \strokec2 number\cf0 \strokec4 ; \cf6 \strokec6 // 0-100\cf0 \cb1 \strokec4 \
\cb3   repo_url?: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   deploy_url?: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   created_at: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   updated_at: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Client-side State Types (camelCase for internal use)\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 interface\cf0 \strokec4  \cf7 \strokec7 Profile\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   userId: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   username: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   avatarUrl: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   totalXp: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   currentLevel: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   createdAt: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 interface\cf0 \strokec4  \cf7 \strokec7 Quest\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   questId: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   createdAt: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   title: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   description?: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   durationMin: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   category: \cf5 \strokec5 'BACKEND'\cf0 \strokec4  | \cf5 \strokec5 'FRONTEND'\cf0 \strokec4  | \cf5 \strokec5 'MOBILE'\cf0 \strokec4  | \cf5 \strokec5 'DEVOPS'\cf0 \strokec4 ;\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 interface\cf0 \strokec4  \cf7 \strokec7 Boss\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   bossId: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   title: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   quarter: \cf8 \strokec8 1\cf0 \strokec4  | \cf8 \strokec8 2\cf0 \strokec4  | \cf8 \strokec8 3\cf0 \strokec4  | \cf8 \strokec8 4\cf0 \strokec4 ;\cb1 \
\cb3   status: \cf5 \strokec5 'LOCKED'\cf0 \strokec4  | \cf5 \strokec5 'ACTIVE'\cf0 \strokec4  | \cf5 \strokec5 'COMPLETED'\cf0 \strokec4  | \cf5 \strokec5 'FAILED'\cf0 \strokec4 ;\cb1 \
\cb3   progress: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   repoUrl?: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   deployUrl?: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   createdAt: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   updatedAt: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 interface\cf0 \strokec4  \cf7 \strokec7 AppState\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   profile: \cf7 \strokec7 Profile\cf0 \strokec4  | \cf2 \strokec2 null\cf0 \strokec4 ;\cb1 \
\cb3   quests: \cf7 \strokec7 Quest\cf0 \strokec4 [];\cb1 \
\cb3   bosses: \cf7 \strokec7 Boss\cf0 \strokec4 [];\cb1 \
\cb3   isAuthenticated: \cf2 \strokec2 boolean\cf0 \strokec4 ;\cb1 \
\cb3 \}\cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 ## Mock API Layer\cf0 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 ### Mock API Service Structure\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 Create a complete mock API service that simulates real backend behavior:\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```typescript\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // services/mock-api.ts\cf0 \cb1 \strokec4 \
\
\cf6 \cb3 \strokec6 // Utility: Simulate network delay (random 500-1500ms)\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf0 \strokec4  simulateDelay = () => \cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Promise\cf0 \strokec4 (resolve => setTimeout(resolve, \cf7 \strokec7 Math\cf0 \strokec4 .random() * \cf8 \strokec8 1000\cf0 \strokec4  + \cf8 \strokec8 500\cf0 \strokec4 ));\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Utility: Random error simulation (10% chance)\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf0 \strokec4  shouldSimulateError = () => \cf7 \strokec7 Math\cf0 \strokec4 .random() < \cf8 \strokec8 0.1\cf0 \strokec4 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Utility: Generate fake JWT token\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf0 \strokec4  generateMockToken = (email: \cf2 \strokec2 string\cf0 \strokec4 ): \cf2 \strokec2 string\cf0 \strokec4  => \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 const\cf0 \strokec4  payload = \{\cb1 \
\cb3     user_id: \cf5 \strokec5 'mock-user-1'\cf0 \strokec4 ,\cb1 \
\cb3     email,\cb1 \
\cb3     exp: \cf7 \strokec7 Date\cf0 \strokec4 .now() + \cf8 \strokec8 3600000\cf0 \strokec4 , \cf6 \strokec6 // 1 hour expiration\cf0 \cb1 \strokec4 \
\cb3     iat: \cf7 \strokec7 Date\cf0 \strokec4 .now(),\cb1 \
\cb3   \};\cb1 \
\cb3   \cf2 \strokec2 return\cf0 \strokec4  btoa(\cf7 \strokec7 JSON\cf0 \strokec4 .stringify(payload));\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Auth API\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  authApi = \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   login: \cf2 \strokec2 async\cf0 \strokec4  (email: \cf2 \strokec2 string\cf0 \strokec4 , password: \cf2 \strokec2 string\cf0 \strokec4 ): \cf7 \strokec7 Promise\cf0 \strokec4 <\cf7 \strokec7 ApiResponse\cf0 \strokec4 <\cf7 \strokec7 AuthResponse\cf0 \strokec4 >> => \{\cb1 \
\cb3     \cf2 \strokec2 await\cf0 \strokec4  simulateDelay();\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (shouldSimulateError()) \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 false\cf0 \strokec4 , error: \cf5 \strokec5 'Network timeout. Please try again.'\cf0 \strokec4  \};\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (email === \cf5 \strokec5 'superadmin@gmail.com'\cf0 \strokec4  && password === \cf5 \strokec5 '123456'\cf0 \strokec4 ) \{\cb1 \
\cb3       \cf2 \strokec2 const\cf0 \strokec4  token = generateMockToken(email);\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{\cb1 \
\cb3         success: \cf2 \strokec2 true\cf0 \strokec4 ,\cb1 \
\cb3         data: \{\cb1 \
\cb3           token,\cb1 \
\cb3           user: \{\cb1 \
\cb3             user_id: \cf5 \strokec5 'mock-user-1'\cf0 \strokec4 ,\cb1 \
\cb3             email,\cb1 \
\cb3             username: \cf5 \strokec5 'SkillSeeker'\cf0 \strokec4 ,\cb1 \
\cb3           \},\cb1 \
\cb3         \},\cb1 \
\cb3       \};\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 return\cf0 \strokec4  \{ \cb1 \
\cb3       success: \cf2 \strokec2 false\cf0 \strokec4 , \cb1 \
\cb3       error: \cf5 \strokec5 'Invalid email or password'\cf0 \strokec4 ,\cb1 \
\cb3     \};\cb1 \
\cb3   \},\cb1 \
\cb3   \cb1 \
\cb3   logout: \cf2 \strokec2 async\cf0 \strokec4  (): \cf7 \strokec7 Promise\cf0 \strokec4 <\cf7 \strokec7 ApiResponse\cf0 \strokec4 <\cf2 \strokec2 null\cf0 \strokec4 >> => \{\cb1 \
\cb3     \cf2 \strokec2 await\cf0 \strokec4  simulateDelay();\cb1 \
\cb3     \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 true\cf0 \strokec4 , data: \cf2 \strokec2 null\cf0 \strokec4  \};\cb1 \
\cb3   \},\cb1 \
\cb3   \cb1 \
\cb3   validateToken: \cf2 \strokec2 async\cf0 \strokec4  (token: \cf2 \strokec2 string\cf0 \strokec4 ): \cf7 \strokec7 Promise\cf0 \strokec4 <\cf7 \strokec7 ApiResponse\cf0 \strokec4 <\{ valid: \cf2 \strokec2 boolean\cf0 \strokec4  \}>> => \{\cb1 \
\cb3     \cf2 \strokec2 await\cf0 \strokec4  simulateDelay();\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 try\cf0 \strokec4  \{\cb1 \
\cb3       \cf2 \strokec2 const\cf0 \strokec4  payload = \cf7 \strokec7 JSON\cf0 \strokec4 .parse(atob(token));\cb1 \
\cb3       \cf2 \strokec2 const\cf0 \strokec4  isExpired = \cf7 \strokec7 Date\cf0 \strokec4 .now() > payload.exp;\cb1 \
\cb3       \cb1 \
\cb3       \cf2 \strokec2 if\cf0 \strokec4  (isExpired) \{\cb1 \
\cb3         \cf2 \strokec2 return\cf0 \strokec4  \{ \cb1 \
\cb3           success: \cf2 \strokec2 false\cf0 \strokec4 , \cb1 \
\cb3           error: \cf5 \strokec5 'Token expired. Please login again.'\cf0 \strokec4 ,\cb1 \
\cb3         \};\cb1 \
\cb3       \}\cb1 \
\cb3       \cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 true\cf0 \strokec4 , data: \{ valid: \cf2 \strokec2 true\cf0 \strokec4  \} \};\cb1 \
\cb3     \} \cf2 \strokec2 catch\cf0 \strokec4  \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{ \cb1 \
\cb3         success: \cf2 \strokec2 false\cf0 \strokec4 , \cb1 \
\cb3         error: \cf5 \strokec5 'Invalid token'\cf0 \strokec4 ,\cb1 \
\cb3       \};\cb1 \
\cb3     \}\cb1 \
\cb3   \},\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Profile API\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  profileApi = \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   getProfile: \cf2 \strokec2 async\cf0 \strokec4  (): \cf7 \strokec7 Promise\cf0 \strokec4 <\cf7 \strokec7 ApiResponse\cf0 \strokec4 <\cf7 \strokec7 ProfileData\cf0 \strokec4 >> => \{\cb1 \
\cb3     \cf2 \strokec2 await\cf0 \strokec4  simulateDelay();\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (shouldSimulateError()) \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 false\cf0 \strokec4 , error: \cf5 \strokec5 'Failed to fetch profile'\cf0 \strokec4  \};\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf6 \strokec6 // Return mock profile from localStorage or default\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  stored = localStorage.getItem(\cf5 \strokec5 'odyssey_profile_data'\cf0 \strokec4 );\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  profile = stored ? \cf7 \strokec7 JSON\cf0 \strokec4 .parse(stored) : \{\cb1 \
\cb3       user_id: \cf5 \strokec5 'mock-user-1'\cf0 \strokec4 ,\cb1 \
\cb3       username: \cf5 \strokec5 'SkillSeeker'\cf0 \strokec4 ,\cb1 \
\cb3       avatar_url: \cf5 \strokec5 'https://api.dicebear.com/7.x/avataaars/svg?seed=SkillSeeker'\cf0 \strokec4 ,\cb1 \
\cb3       total_xp: \cf8 \strokec8 0\cf0 \strokec4 ,\cb1 \
\cb3       current_level: \cf8 \strokec8 1\cf0 \strokec4 ,\cb1 \
\cb3       created_at: \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Date\cf0 \strokec4 ().toISOString(),\cb1 \
\cb3     \};\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 true\cf0 \strokec4 , data: profile \};\cb1 \
\cb3   \},\cb1 \
\cb3   \cb1 \
\cb3   updateProfile: \cf2 \strokec2 async\cf0 \strokec4  (updates: \cf7 \strokec7 Partial\cf0 \strokec4 <\cf7 \strokec7 ProfileData\cf0 \strokec4 >): \cf7 \strokec7 Promise\cf0 \strokec4 <\cf7 \strokec7 ApiResponse\cf0 \strokec4 <\cf7 \strokec7 ProfileData\cf0 \strokec4 >> => \{\cb1 \
\cb3     \cf2 \strokec2 await\cf0 \strokec4  simulateDelay();\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (shouldSimulateError()) \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 false\cf0 \strokec4 , error: \cf5 \strokec5 'Failed to update profile'\cf0 \strokec4  \};\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf6 \strokec6 // Validate username\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (updates.username && updates.username.length < \cf8 \strokec8 1\cf0 \strokec4 ) \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{\cb1 \
\cb3         success: \cf2 \strokec2 false\cf0 \strokec4 ,\cb1 \
\cb3         error: \cf5 \strokec5 'Validation failed'\cf0 \strokec4 ,\cb1 \
\cb3         validation_errors: \{ username: \cf5 \strokec5 'Username is required'\cf0 \strokec4  \},\cb1 \
\cb3       \};\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf6 \strokec6 // Update mock profile\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  stored = localStorage.getItem(\cf5 \strokec5 'odyssey_profile_data'\cf0 \strokec4 );\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  current = stored ? \cf7 \strokec7 JSON\cf0 \strokec4 .parse(stored) : \{\};\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  updated = \{ ...current, ...updates \};\cb1 \
\cb3     localStorage.setItem(\cf5 \strokec5 'odyssey_profile_data'\cf0 \strokec4 , \cf7 \strokec7 JSON\cf0 \strokec4 .stringify(updated));\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 true\cf0 \strokec4 , data: updated \};\cb1 \
\cb3   \},\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Quest API\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  questApi = \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   getQuests: \cf2 \strokec2 async\cf0 \strokec4  (): \cf7 \strokec7 Promise\cf0 \strokec4 <\cf7 \strokec7 ApiResponse\cf0 \strokec4 <\cf7 \strokec7 QuestData\cf0 \strokec4 []>> => \{\cb1 \
\cb3     \cf2 \strokec2 await\cf0 \strokec4  simulateDelay();\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (shouldSimulateError()) \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 false\cf0 \strokec4 , error: \cf5 \strokec5 'Failed to fetch quests'\cf0 \strokec4  \};\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  stored = localStorage.getItem(\cf5 \strokec5 'odyssey_quests_data'\cf0 \strokec4 );\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  quests = stored ? \cf7 \strokec7 JSON\cf0 \strokec4 .parse(stored) : [];\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 true\cf0 \strokec4 , data: quests \};\cb1 \
\cb3   \},\cb1 \
\cb3   \cb1 \
\cb3   createQuest: \cf2 \strokec2 async\cf0 \strokec4  (questData: \cf7 \strokec7 Omit\cf0 \strokec4 <\cf7 \strokec7 QuestData\cf0 \strokec4 , \cf5 \strokec5 'quest_id'\cf0 \strokec4  | \cf5 \strokec5 'created_at'\cf0 \strokec4 >): \cf7 \strokec7 Promise\cf0 \strokec4 <\cf7 \strokec7 ApiResponse\cf0 \strokec4 <\cf7 \strokec7 QuestData\cf0 \strokec4 >> => \{\cb1 \
\cb3     \cf2 \strokec2 await\cf0 \strokec4  simulateDelay();\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (shouldSimulateError()) \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 false\cf0 \strokec4 , error: \cf5 \strokec5 'Failed to create quest'\cf0 \strokec4  \};\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf6 \strokec6 // Validation\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (!questData.title || questData.title.length < \cf8 \strokec8 1\cf0 \strokec4 ) \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{\cb1 \
\cb3         success: \cf2 \strokec2 false\cf0 \strokec4 ,\cb1 \
\cb3         error: \cf5 \strokec5 'Validation failed'\cf0 \strokec4 ,\cb1 \
\cb3         validation_errors: \{ title: \cf5 \strokec5 'Title is required'\cf0 \strokec4  \},\cb1 \
\cb3       \};\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (questData.duration_min < \cf8 \strokec8 1\cf0 \strokec4 ) \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{\cb1 \
\cb3         success: \cf2 \strokec2 false\cf0 \strokec4 ,\cb1 \
\cb3         error: \cf5 \strokec5 'Validation failed'\cf0 \strokec4 ,\cb1 \
\cb3         validation_errors: \{ duration_min: \cf5 \strokec5 'Duration must be at least 1 minute'\cf0 \strokec4  \},\cb1 \
\cb3       \};\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  newQuest: \cf7 \strokec7 QuestData\cf0 \strokec4  = \{\cb1 \
\cb3       quest_id: \cf5 \strokec5 `quest_\cf0 \strokec4 $\{\cf7 \strokec7 Date\cf0 \strokec4 .now()\}\cf5 \strokec5 `\cf0 \strokec4 ,\cb1 \
\cb3       created_at: \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Date\cf0 \strokec4 ().toISOString(),\cb1 \
\cb3       ...questData,\cb1 \
\cb3     \};\cb1 \
\cb3     \cb1 \
\cb3     \cf6 \strokec6 // Store quest\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  stored = localStorage.getItem(\cf5 \strokec5 'odyssey_quests_data'\cf0 \strokec4 );\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  quests = stored ? \cf7 \strokec7 JSON\cf0 \strokec4 .parse(stored) : [];\cb1 \
\cb3     quests.unshift(newQuest);\cb1 \
\cb3     localStorage.setItem(\cf5 \strokec5 'odyssey_quests_data'\cf0 \strokec4 , \cf7 \strokec7 JSON\cf0 \strokec4 .stringify(quests));\cb1 \
\cb3     \cb1 \
\cb3     \cf6 \strokec6 // Update profile XP\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  profileStored = localStorage.getItem(\cf5 \strokec5 'odyssey_profile_data'\cf0 \strokec4 );\cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (profileStored) \{\cb1 \
\cb3       \cf2 \strokec2 const\cf0 \strokec4  profile = \cf7 \strokec7 JSON\cf0 \strokec4 .parse(profileStored);\cb1 \
\cb3       profile.total_xp += questData.duration_min;\cb1 \
\cb3       profile.current_level = \cf7 \strokec7 Math\cf0 \strokec4 .floor(\cf7 \strokec7 Math\cf0 \strokec4 .sqrt(profile.total_xp / \cf8 \strokec8 60\cf0 \strokec4 ));\cb1 \
\cb3       localStorage.setItem(\cf5 \strokec5 'odyssey_profile_data'\cf0 \strokec4 , \cf7 \strokec7 JSON\cf0 \strokec4 .stringify(profile));\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 true\cf0 \strokec4 , data: newQuest \};\cb1 \
\cb3   \},\cb1 \
\cb3   \cb1 \
\cb3   deleteQuest: \cf2 \strokec2 async\cf0 \strokec4  (questId: \cf2 \strokec2 string\cf0 \strokec4 ): \cf7 \strokec7 Promise\cf0 \strokec4 <\cf7 \strokec7 ApiResponse\cf0 \strokec4 <\{ deleted: \cf2 \strokec2 boolean\cf0 \strokec4  \}>> => \{\cb1 \
\cb3     \cf2 \strokec2 await\cf0 \strokec4  simulateDelay();\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (shouldSimulateError()) \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 false\cf0 \strokec4 , error: \cf5 \strokec5 'Failed to delete quest'\cf0 \strokec4  \};\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  stored = localStorage.getItem(\cf5 \strokec5 'odyssey_quests_data'\cf0 \strokec4 );\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  quests: \cf7 \strokec7 QuestData\cf0 \strokec4 [] = stored ? \cf7 \strokec7 JSON\cf0 \strokec4 .parse(stored) : [];\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  questToDelete = quests.find(q => q.quest_id === questId);\cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (!questToDelete) \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 false\cf0 \strokec4 , error: \cf5 \strokec5 'Quest not found'\cf0 \strokec4  \};\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  filtered = quests.filter(q => q.quest_id !== questId);\cb1 \
\cb3     localStorage.setItem(\cf5 \strokec5 'odyssey_quests_data'\cf0 \strokec4 , \cf7 \strokec7 JSON\cf0 \strokec4 .stringify(filtered));\cb1 \
\cb3     \cb1 \
\cb3     \cf6 \strokec6 // Update profile XP (subtract)\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  profileStored = localStorage.getItem(\cf5 \strokec5 'odyssey_profile_data'\cf0 \strokec4 );\cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (profileStored) \{\cb1 \
\cb3       \cf2 \strokec2 const\cf0 \strokec4  profile = \cf7 \strokec7 JSON\cf0 \strokec4 .parse(profileStored);\cb1 \
\cb3       profile.total_xp = \cf7 \strokec7 Math\cf0 \strokec4 .max(\cf8 \strokec8 0\cf0 \strokec4 , profile.total_xp - questToDelete.duration_min);\cb1 \
\cb3       profile.current_level = \cf7 \strokec7 Math\cf0 \strokec4 .floor(\cf7 \strokec7 Math\cf0 \strokec4 .sqrt(profile.total_xp / \cf8 \strokec8 60\cf0 \strokec4 ));\cb1 \
\cb3       localStorage.setItem(\cf5 \strokec5 'odyssey_profile_data'\cf0 \strokec4 , \cf7 \strokec7 JSON\cf0 \strokec4 .stringify(profile));\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 true\cf0 \strokec4 , data: \{ deleted: \cf2 \strokec2 true\cf0 \strokec4  \} \};\cb1 \
\cb3   \},\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Boss API\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  bossApi = \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   getBosses: \cf2 \strokec2 async\cf0 \strokec4  (): \cf7 \strokec7 Promise\cf0 \strokec4 <\cf7 \strokec7 ApiResponse\cf0 \strokec4 <\cf7 \strokec7 BossData\cf0 \strokec4 []>> => \{\cb1 \
\cb3     \cf2 \strokec2 await\cf0 \strokec4  simulateDelay();\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (shouldSimulateError()) \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 false\cf0 \strokec4 , error: \cf5 \strokec5 'Failed to fetch bosses'\cf0 \strokec4  \};\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  stored = localStorage.getItem(\cf5 \strokec5 'odyssey_bosses_data'\cf0 \strokec4 );\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  bosses = stored ? \cf7 \strokec7 JSON\cf0 \strokec4 .parse(stored) : [];\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 true\cf0 \strokec4 , data: bosses \};\cb1 \
\cb3   \},\cb1 \
\cb3   \cb1 \
\cb3   createBoss: \cf2 \strokec2 async\cf0 \strokec4  (bossData: \cf7 \strokec7 Omit\cf0 \strokec4 <\cf7 \strokec7 BossData\cf0 \strokec4 , \cf5 \strokec5 'boss_id'\cf0 \strokec4  | \cf5 \strokec5 'created_at'\cf0 \strokec4  | \cf5 \strokec5 'updated_at'\cf0 \strokec4 >): \cf7 \strokec7 Promise\cf0 \strokec4 <\cf7 \strokec7 ApiResponse\cf0 \strokec4 <\cf7 \strokec7 BossData\cf0 \strokec4 >> => \{\cb1 \
\cb3     \cf2 \strokec2 await\cf0 \strokec4  simulateDelay();\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (shouldSimulateError()) \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 false\cf0 \strokec4 , error: \cf5 \strokec5 'Failed to create boss'\cf0 \strokec4  \};\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf6 \strokec6 // Validation\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (!bossData.title || bossData.title.length < \cf8 \strokec8 1\cf0 \strokec4 ) \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{\cb1 \
\cb3         success: \cf2 \strokec2 false\cf0 \strokec4 ,\cb1 \
\cb3         error: \cf5 \strokec5 'Validation failed'\cf0 \strokec4 ,\cb1 \
\cb3         validation_errors: \{ title: \cf5 \strokec5 'Title is required'\cf0 \strokec4  \},\cb1 \
\cb3       \};\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  newBoss: \cf7 \strokec7 BossData\cf0 \strokec4  = \{\cb1 \
\cb3       boss_id: \cf5 \strokec5 `boss_\cf0 \strokec4 $\{\cf7 \strokec7 Date\cf0 \strokec4 .now()\}\cf5 \strokec5 `\cf0 \strokec4 ,\cb1 \
\cb3       created_at: \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Date\cf0 \strokec4 ().toISOString(),\cb1 \
\cb3       updated_at: \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Date\cf0 \strokec4 ().toISOString(),\cb1 \
\cb3       ...bossData,\cb1 \
\cb3     \};\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  stored = localStorage.getItem(\cf5 \strokec5 'odyssey_bosses_data'\cf0 \strokec4 );\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  bosses = stored ? \cf7 \strokec7 JSON\cf0 \strokec4 .parse(stored) : [];\cb1 \
\cb3     bosses.push(newBoss);\cb1 \
\cb3     localStorage.setItem(\cf5 \strokec5 'odyssey_bosses_data'\cf0 \strokec4 , \cf7 \strokec7 JSON\cf0 \strokec4 .stringify(bosses));\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 true\cf0 \strokec4 , data: newBoss \};\cb1 \
\cb3   \},\cb1 \
\cb3   \cb1 \
\cb3   updateBoss: \cf2 \strokec2 async\cf0 \strokec4  (bossId: \cf2 \strokec2 string\cf0 \strokec4 , updates: \cf7 \strokec7 Partial\cf0 \strokec4 <\cf7 \strokec7 BossData\cf0 \strokec4 >): \cf7 \strokec7 Promise\cf0 \strokec4 <\cf7 \strokec7 ApiResponse\cf0 \strokec4 <\cf7 \strokec7 BossData\cf0 \strokec4 >> => \{\cb1 \
\cb3     \cf2 \strokec2 await\cf0 \strokec4  simulateDelay();\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (shouldSimulateError()) \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 false\cf0 \strokec4 , error: \cf5 \strokec5 'Failed to update boss'\cf0 \strokec4  \};\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  stored = localStorage.getItem(\cf5 \strokec5 'odyssey_bosses_data'\cf0 \strokec4 );\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  bosses: \cf7 \strokec7 BossData\cf0 \strokec4 [] = stored ? \cf7 \strokec7 JSON\cf0 \strokec4 .parse(stored) : [];\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  index = bosses.findIndex(b => b.boss_id === bossId);\cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (index === -\cf8 \strokec8 1\cf0 \strokec4 ) \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 false\cf0 \strokec4 , error: \cf5 \strokec5 'Boss not found'\cf0 \strokec4  \};\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     bosses[index] = \{\cb1 \
\cb3       ...bosses[index],\cb1 \
\cb3       ...updates,\cb1 \
\cb3       updated_at: \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Date\cf0 \strokec4 ().toISOString(),\cb1 \
\cb3     \};\cb1 \
\cb3     \cb1 \
\cb3     localStorage.setItem(\cf5 \strokec5 'odyssey_bosses_data'\cf0 \strokec4 , \cf7 \strokec7 JSON\cf0 \strokec4 .stringify(bosses));\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 true\cf0 \strokec4 , data: bosses[index] \};\cb1 \
\cb3   \},\cb1 \
\cb3   \cb1 \
\cb3   deleteBoss: \cf2 \strokec2 async\cf0 \strokec4  (bossId: \cf2 \strokec2 string\cf0 \strokec4 ): \cf7 \strokec7 Promise\cf0 \strokec4 <\cf7 \strokec7 ApiResponse\cf0 \strokec4 <\{ deleted: \cf2 \strokec2 boolean\cf0 \strokec4  \}>> => \{\cb1 \
\cb3     \cf2 \strokec2 await\cf0 \strokec4  simulateDelay();\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (shouldSimulateError()) \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 false\cf0 \strokec4 , error: \cf5 \strokec5 'Failed to delete boss'\cf0 \strokec4  \};\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  stored = localStorage.getItem(\cf5 \strokec5 'odyssey_bosses_data'\cf0 \strokec4 );\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  bosses: \cf7 \strokec7 BossData\cf0 \strokec4 [] = stored ? \cf7 \strokec7 JSON\cf0 \strokec4 .parse(stored) : [];\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  filtered = bosses.filter(b => b.boss_id !== bossId);\cb1 \
\cb3     localStorage.setItem(\cf5 \strokec5 'odyssey_bosses_data'\cf0 \strokec4 , \cf7 \strokec7 JSON\cf0 \strokec4 .stringify(filtered));\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 true\cf0 \strokec4 , data: \{ deleted: \cf2 \strokec2 true\cf0 \strokec4  \} \};\cb1 \
\cb3   \},\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Rate Limiting Simulation\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 let\cf0 \strokec4  rateLimitStore: \cf7 \strokec7 Record\cf0 \strokec4 <\cf2 \strokec2 string\cf0 \strokec4 , \cf2 \strokec2 number\cf0 \strokec4 []> = \{\};\cb1 \
\
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  checkRateLimit = (key: \cf2 \strokec2 string\cf0 \strokec4 , maxRequests: \cf2 \strokec2 number\cf0 \strokec4  = \cf8 \strokec8 10\cf0 \strokec4 , windowMs: \cf2 \strokec2 number\cf0 \strokec4  = \cf8 \strokec8 60000\cf0 \strokec4 ): \cf2 \strokec2 boolean\cf0 \strokec4  => \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 const\cf0 \strokec4  now = \cf7 \strokec7 Date\cf0 \strokec4 .now();\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (!rateLimitStore[key]) \{\cb1 \
\cb3     rateLimitStore[key] = [];\cb1 \
\cb3   \}\cb1 \
\cb3   \cb1 \
\cb3   \cf6 \strokec6 // Clean old requests outside window\cf0 \cb1 \strokec4 \
\cb3   rateLimitStore[key] = rateLimitStore[key].filter(time => now - time < windowMs);\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (rateLimitStore[key].length >= maxRequests) \{\cb1 \
\cb3     \cf2 \strokec2 return\cf0 \strokec4  \cf2 \strokec2 false\cf0 \strokec4 ; \cf6 \strokec6 // Rate limited\cf0 \cb1 \strokec4 \
\cb3   \}\cb1 \
\cb3   \cb1 \
\cb3   rateLimitStore[key].push(now);\cb1 \
\cb3   \cf2 \strokec2 return\cf0 \strokec4  \cf2 \strokec2 true\cf0 \strokec4 ;\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Wrap API calls with rate limiting\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  withRateLimit = \cf2 \strokec2 async\cf0 \strokec4  <\cf7 \strokec7 T\cf0 \strokec4 >(\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   key: \cf2 \strokec2 string\cf0 \strokec4 ,\cb1 \
\cb3   apiCall: () => \cf7 \strokec7 Promise\cf0 \strokec4 <\cf7 \strokec7 ApiResponse\cf0 \strokec4 <\cf7 \strokec7 T\cf0 \strokec4 >>\cb1 \
\cb3 ): \cf7 \strokec7 Promise\cf0 \strokec4 <\cf7 \strokec7 ApiResponse\cf0 \strokec4 <\cf7 \strokec7 T\cf0 \strokec4 >> => \{\cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (!checkRateLimit(key)) \{\cb1 \
\cb3     \cf2 \strokec2 return\cf0 \strokec4  \{\cb1 \
\cb3       success: \cf2 \strokec2 false\cf0 \strokec4 ,\cb1 \
\cb3       error: \cf5 \strokec5 'Too many requests. Please wait a moment and try again.'\cf0 \strokec4 ,\cb1 \
\cb3     \};\cb1 \
\cb3   \}\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 return\cf0 \strokec4  apiCall();\cb1 \
\cb3 \};\cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 ### Data Transformation Utilities\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```typescript\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // lib/transformers.ts\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 // Convert snake_case API responses to camelCase for client use\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 function\cf0 \strokec4  transformProfileData(data: \cf7 \strokec7 ProfileData\cf0 \strokec4 ): \cf7 \strokec7 Profile\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 return\cf0 \strokec4  \{\cb1 \
\cb3     userId: data.user_id,\cb1 \
\cb3     username: data.username,\cb1 \
\cb3     avatarUrl: data.avatar_url,\cb1 \
\cb3     totalXp: data.total_xp,\cb1 \
\cb3     currentLevel: data.current_level,\cb1 \
\cb3     createdAt: data.created_at,\cb1 \
\cb3   \};\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 function\cf0 \strokec4  transformQuestData(data: \cf7 \strokec7 QuestData\cf0 \strokec4 ): \cf7 \strokec7 Quest\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 return\cf0 \strokec4  \{\cb1 \
\cb3     questId: data.quest_id,\cb1 \
\cb3     createdAt: data.created_at,\cb1 \
\cb3     title: data.title,\cb1 \
\cb3     description: data.description,\cb1 \
\cb3     durationMin: data.duration_min,\cb1 \
\cb3     category: data.category,\cb1 \
\cb3   \};\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 function\cf0 \strokec4  transformBossData(data: \cf7 \strokec7 BossData\cf0 \strokec4 ): \cf7 \strokec7 Boss\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 return\cf0 \strokec4  \{\cb1 \
\cb3     bossId: data.boss_id,\cb1 \
\cb3     title: data.title,\cb1 \
\cb3     quarter: data.quarter,\cb1 \
\cb3     status: data.status,\cb1 \
\cb3     progress: data.progress,\cb1 \
\cb3     repoUrl: data.repo_url,\cb1 \
\cb3     deployUrl: data.deploy_url,\cb1 \
\cb3     createdAt: data.created_at,\cb1 \
\cb3     updatedAt: data.updated_at,\cb1 \
\cb3   \};\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Reverse transformations for sending to API\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 function\cf0 \strokec4  toQuestData(quest: \cf7 \strokec7 Omit\cf0 \strokec4 <\cf7 \strokec7 Quest\cf0 \strokec4 , \cf5 \strokec5 'questId'\cf0 \strokec4  | \cf5 \strokec5 'createdAt'\cf0 \strokec4 >): \cf7 \strokec7 Omit\cf0 \strokec4 <\cf7 \strokec7 QuestData\cf0 \strokec4 , \cf5 \strokec5 'quest_id'\cf0 \strokec4  | \cf5 \strokec5 'created_at'\cf0 \strokec4 > \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 return\cf0 \strokec4  \{\cb1 \
\cb3     title: quest.title,\cb1 \
\cb3     description: quest.description,\cb1 \
\cb3     duration_min: quest.durationMin,\cb1 \
\cb3     category: quest.category,\cb1 \
\cb3   \};\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 function\cf0 \strokec4  toBossData(boss: \cf7 \strokec7 Partial\cf0 \strokec4 <\cf7 \strokec7 Boss\cf0 \strokec4 >): \cf7 \strokec7 Partial\cf0 \strokec4 <\cf7 \strokec7 BossData\cf0 \strokec4 > \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 const\cf0 \strokec4  data: \cf7 \strokec7 Partial\cf0 \strokec4 <\cf7 \strokec7 BossData\cf0 \strokec4 > = \{\};\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (boss.title !== \cf2 \strokec2 undefined\cf0 \strokec4 ) data.title = boss.title;\cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (boss.quarter !== \cf2 \strokec2 undefined\cf0 \strokec4 ) data.quarter = boss.quarter;\cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (boss.status !== \cf2 \strokec2 undefined\cf0 \strokec4 ) data.status = boss.status;\cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (boss.progress !== \cf2 \strokec2 undefined\cf0 \strokec4 ) data.progress = boss.progress;\cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (boss.repoUrl !== \cf2 \strokec2 undefined\cf0 \strokec4 ) data.repo_url = boss.repoUrl;\cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (boss.deployUrl !== \cf2 \strokec2 undefined\cf0 \strokec4 ) data.deploy_url = boss.deployUrl;\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 return\cf0 \strokec4  data;\cb1 \
\cb3 \}\cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 ## Complete Application Requirements\cf0 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 ### 1. Authentication & User Management\cf0 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 #### Login Page (`app/login/page.tsx`)\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Clean, centered login form with dark RPG theme\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Form fields:\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Email input (type="email", required)\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Password input (type="password", required)\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 "Remember me" checkbox (optional)\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Submit button with loading spinner\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Mock credentials display for testing: \cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Small note: "Demo: superadmin@gmail.com / 123456"\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Form validation with Zod\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Error display for invalid credentials\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Loading state during mock API call\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Redirect to dashboard on success\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Toast notification on login success/failure\cb1 \
\
\cf2 \cb3 \strokec2 #### Auth Middleware (`middleware.ts`)\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```typescript\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Protect dashboard routes\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 // Check for valid token in localStorage\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 // Redirect to /login if no token or expired\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 // Validate token using authApi.validateToken()\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 #### Auth Context/Hook\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```typescript\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // hooks/use-auth.ts\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 // Provides: user, isAuthenticated, login, logout, isLoading\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 // Handles token storage and validation\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 // Checks token expiration on mount\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 // Auto-logout when token expires\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 #### Logout Functionality\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Logout button in navbar\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Confirmation dialog (optional)\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Call authApi.logout()\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Clear localStorage (token + all data)\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Redirect to login page\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Toast notification\cb1 \
\
\cf2 \cb3 \strokec2 ### 2. Dashboard Layout & Components\cf0 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 #### Profile Header Section\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Display user avatar (from auth response or default)\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Show username prominently with edit icon\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Display current level with glowing badge\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Total XP with animated progress bar to next level\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 XP remaining display (e.g., "230 XP to Level 5")\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Level calculation formula: \cf9 \strokec9 `Level = floor(sqrt(totalMinutes / 60))`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Inline edit for username (click to edit, auto-save)\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Loading skeleton while fetching profile\cb1 \
\
\cf2 \cb3 \strokec2 #### Stat Cards Grid\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 4 cards for: 
\f1\b **Backend**
\f0\b0 , 
\f1\b **Frontend**
\f0\b0 , 
\f1\b **Mobile**
\f0\b0 , 
\f1\b **DevOps**
\f0\b0 \cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Each card displays:\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Category icon with color coding:\cb1 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 Backend: Shield (blue-500)\cb1 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 Frontend: Layout (purple-500)  \cb1 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 Mobile: Smartphone (pink-500)\cb1 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 DevOps: Server (amber-500)\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Total minutes logged in category\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Radial progress chart showing percentage of total\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Percentage number (e.g., "35%")\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Animated counter on data update\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Hover effect with scale and glow\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Responsive grid:\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Mobile: 1 column\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Tablet: 2 columns  \cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Desktop: 4 columns\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Loading: Skeleton cards during fetch\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Empty state: Shows 0 for all categories\cb1 \
\
\cf2 \cb3 \strokec2 #### Quest Log Section\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Section header: "Quest Log" with quest count badge\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 "Log New Quest" button (Plus icon) - opens modal\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Quest form modal:\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Title input (required, max 100 chars)\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Description textarea (optional, max 500 chars)\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Duration input (number, required, min 1, max 1440)\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Category select with icons (Backend/Frontend/Mobile/DevOps)\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Form validation with real-time error display\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Submit button with loading spinner\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Cancel button\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Toast on success/error\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Quest list:\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Shows 10 most recent quests\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Each quest card displays:\cb1 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 Title (bold) and description\cb1 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 Category badge with icon\cb1 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 Duration (formatted: "2h 30m" or "45 min")\cb1 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 Relative timestamp ("2 hours ago")\cb1 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 Delete button (Trash icon) with confirmation\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Loading: Skeleton quest cards (5 placeholders)\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Empty state: "No quests logged yet" with illustration\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Smooth animations for add/remove\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Optimistic updates:\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Add quest to UI immediately\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Show as "pending" with opacity\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Update on API success\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Rollback on API error with toast\cb1 \
\
\cf2 \cb3 \strokec2 #### Boss Tracker Section\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Large featured card for current quarter's boss\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Display elements:\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Boss title (editable)\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Quarter badge (e.g., "Q1 2026")\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Status badge with styling:\cb1 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 Locked: gray + Lock icon\cb1 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 Active: blue + Flame icon + pulse animation\cb1 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 Completed: green + Check icon + confetti\cb1 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 Failed: red + X icon\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Boss "Health Bar" (progress 0-100%)\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Large progress percentage\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Action buttons:\cb1 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 "Edit Boss" button\cb1 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 GitHub link (if repo_url exists)\cb1 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 Deploy link (if deploy_url exists)\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Edit boss modal:\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Title input\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Progress slider (0-100) with live preview\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Status dropdown\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 GitHub URL input (validated)\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Deploy URL input (validated)\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Save button with loading state\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Cancel button\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Visual design:\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Dark card with gradient neon border\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Dramatic shadows and glow effects\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Pulse animation when active\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Confetti burst when marked completed\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Loading: Skeleton boss card\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Empty state: "Create your first quarterly boss"\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Optimistic updates for progress changes\cb1 \
\
\cf2 \cb3 \strokec2 #### Boss History Section\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 "Create New Boss" button\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Quarter filter tabs (Q1, Q2, Q3, Q4, All)\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Grid of completed/failed boss cards:\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Project title\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Quarter badge\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Status badge\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Final progress percentage\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Links (GitHub + Deploy)\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Created/Updated dates\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Empty state per quarter\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Loading: Skeleton grid\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Responsive grid (1-2-3 columns)\cb1 \
\
\cf2 \cb3 \strokec2 ### 3. Loading States & Skeletons\cf0 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 #### Skeleton Components\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 Create reusable skeleton components with shimmer effect:\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```typescript\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // components/skeletons/stat-card-skeleton.tsx\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 // Mimics stat card structure with gray blocks\cf0 \cb1 \strokec4 \
\
\cf6 \cb3 \strokec6 // components/skeletons/quest-item-skeleton.tsx  \cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 // Mimics quest card with lines and badges\cf0 \cb1 \strokec4 \
\
\cf6 \cb3 \strokec6 // components/skeletons/boss-card-skeleton.tsx\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 // Mimics boss tracker with large progress bar\cf0 \cb1 \strokec4 \
\
\cf6 \cb3 \strokec6 // components/skeletons/profile-skeleton.tsx\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 // Circle for avatar, lines for name/level\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 #### Loading States\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - 
\f1\b \cf0 \strokec4 **Initial page load**
\f0\b0 : Show all skeletons while fetching\cb1 \
\cf2 \cb3 \strokec2 - 
\f1\b \cf0 \strokec4 **Button loading**
\f0\b0 : Spinner icon + disabled state\cb1 \
\cf2 \cb3 \strokec2 - 
\f1\b \cf0 \strokec4 **Form submission**
\f0\b0 : Button spinner + form disabled\cb1 \
\cf2 \cb3 \strokec2 - 
\f1\b \cf0 \strokec4 **Optimistic updates**
\f0\b0 : Show pending state (reduced opacity)\cb1 \
\cf2 \cb3 \strokec2 - 
\f1\b \cf0 \strokec4 **Refresh/refetch**
\f0\b0 : Keep existing data visible, show subtle loading indicator\cb1 \
\
\cf2 \cb3 \strokec2 ### 4. Error Handling UI\cf0 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 #### Error Display Components\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```typescript\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // components/ui/error-alert.tsx\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 // Red alert box with error icon\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 // Shows error message\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 // Retry button (if applicable)\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 // Dismiss button\cf0 \cb1 \strokec4 \
\
\cf6 \cb3 \strokec6 // components/ui/inline-error.tsx\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 // Small red text under form fields\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 // Shows validation errors\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 #### Error Scenarios to Handle\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 1. 
\f1\b \cf0 \strokec4 **Network errors**
\f0\b0 : "Network timeout. Please try again."\cb1 \
\cf2 \cb3 \strokec2 2. 
\f1\b \cf0 \strokec4 **Validation errors**
\f0\b0 : Display field-specific errors\cb1 \
\cf2 \cb3 \strokec2 3. 
\f1\b \cf0 \strokec4 **Token expiration**
\f0\b0 : Auto-logout + redirect to login\cb1 \
\cf2 \cb3 \strokec2 4. 
\f1\b \cf0 \strokec4 **Rate limiting**
\f0\b0 : "Too many requests. Please wait..."\cb1 \
\cf2 \cb3 \strokec2 5. 
\f1\b \cf0 \strokec4 **Not found errors**
\f0\b0 : "Quest/Boss not found"\cb1 \
\cf2 \cb3 \strokec2 6. 
\f1\b \cf0 \strokec4 **Generic errors**
\f0\b0 : "Something went wrong. Please try again."\cb1 \
\
\cf2 \cb3 \strokec2 #### Toast Notifications (Shadcn Toast)\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Success: Green with check icon\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Error: Red with X icon  \cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Info: Blue with info icon\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Auto-dismiss after 5 seconds\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Manual dismiss button\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Stack multiple toasts\cb1 \
\
\cf2 \cb3 \strokec2 ### 5. UI/UX Design Requirements\cf0 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 #### Visual Theme\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - 
\f1\b \cf0 \strokec4 **Color Palette:**
\f0\b0 \cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Background: \cf9 \strokec9 `bg-slate-950`\cf0 \strokec4  with noise texture overlay\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Cards: \cf9 \strokec9 `bg-slate-900/50`\cf0 \strokec4  with \cf9 \strokec9 `backdrop-blur-xl`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Borders: \cf9 \strokec9 `border-slate-800`\cf0 \strokec4  with gradient accents\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 XP/Progress: \cf9 \strokec9 `bg-gradient-to-r from-green-500 to-cyan-500`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Text Primary: \cf9 \strokec9 `text-slate-100`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Text Secondary: \cf9 \strokec9 `text-slate-400`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Category Colors:\cb1 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 Backend: \cf9 \strokec9 `blue-500`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 Frontend: \cf9 \strokec9 `purple-500`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 Mobile: \cf9 \strokec9 `pink-500`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2     - \cf0 \strokec4 DevOps: \cf9 \strokec9 `amber-500`\cf0 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 #### Typography\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Font: Inter (body), JetBrains Mono (stats/numbers)\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Headings: \cf9 \strokec9 `font-bold uppercase tracking-wide text-lg`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Stats: \cf9 \strokec9 `font-mono text-4xl font-bold tabular-nums`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Body: \cf9 \strokec9 `text-base leading-relaxed`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Small text: \cf9 \strokec9 `text-sm text-slate-400`\cf0 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 #### Spacing & Layout\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Container: \cf9 \strokec9 `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Section spacing: \cf9 \strokec9 `space-y-8 md:space-y-12`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Card padding: \cf9 \strokec9 `p-6 md:p-8`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Grid gaps: \cf9 \strokec9 `gap-4 md:gap-6`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Consistent spacing: 4px scale (4, 8, 12, 16, 24, 32)\cb1 \
\
\cf2 \cb3 \strokec2 #### Animations (Framer Motion)\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0

\f1\b \cf0 \cb3 **Page Transitions:**
\f0\b0 \cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```typescript\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Fade in on mount\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 initial=\{\{ opacity: \cf8 \strokec8 0\cf0 \strokec4 , y: \cf8 \strokec8 20\cf0 \strokec4  \}\}\cb1 \
\cb3 animate=\{\{ opacity: \cf8 \strokec8 1\cf0 \strokec4 , y: \cf8 \strokec8 0\cf0 \strokec4  \}\}\cb1 \
\cb3 transition=\{\{ duration: \cf8 \strokec8 0.5\cf0 \strokec4  \}\}\cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0

\f1\b \cf0 \cb3 **Stat Cards:**
\f0\b0 \cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```typescript\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Stagger children\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 <motion.div variants=\{container\}>\cb1 \
\cb3   \{cards.map((card, i) => (\cb1 \
\cb3     <motion.div variants=\{item\} />\cb1 \
\cb3   ))\}\cb1 \
\cb3 </motion.div>\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Hover effect\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 whileHover=\{\{ scale: \cf8 \strokec8 1.02\cf0 \strokec4 , borderColor: \cf5 \strokec5 'cyan'\cf0 \strokec4  \}\}\cb1 \
\cb3 whileTap=\{\{ scale: \cf8 \strokec8 0.98\cf0 \strokec4  \}\}\cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0

\f1\b \cf0 \cb3 **Quest Creation:**
\f0\b0 \cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```typescript\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Modal entrance\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 initial=\{\{ scale: \cf8 \strokec8 0.9\cf0 \strokec4 , opacity: \cf8 \strokec8 0\cf0 \strokec4  \}\}\cb1 \
\cb3 animate=\{\{ scale: \cf8 \strokec8 1\cf0 \strokec4 , opacity: \cf8 \strokec8 1\cf0 \strokec4  \}\}\cb1 \
\cb3 exit=\{\{ scale: \cf8 \strokec8 0.9\cf0 \strokec4 , opacity: \cf8 \strokec8 0\cf0 \strokec4  \}\}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // New quest slide in\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 initial=\{\{ x: -\cf8 \strokec8 20\cf0 \strokec4 , opacity: \cf8 \strokec8 0\cf0 \strokec4  \}\}\cb1 \
\cb3 animate=\{\{ x: \cf8 \strokec8 0\cf0 \strokec4 , opacity: \cf8 \strokec8 1\cf0 \strokec4  \}\}\cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0

\f1\b \cf0 \cb3 **Level Up Animation:**
\f0\b0 \cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```typescript\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Full screen overlay\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 <motion.div\cb1 \
\cb3   initial=\{\{ opacity: \cf8 \strokec8 0\cf0 \strokec4  \}\}\cb1 \
\cb3   animate=\{\{ opacity: \cf8 \strokec8 1\cf0 \strokec4  \}\}\cb1 \
\cb3   exit=\{\{ opacity: \cf8 \strokec8 0\cf0 \strokec4  \}\}\cb1 \
\cb3 >\cb1 \
\cb3   <motion.div\cb1 \
\cb3     initial=\{\{ scale: \cf8 \strokec8 0\cf0 \strokec4  \}\}\cb1 \
\cb3     animate=\{\{ scale: [\cf8 \strokec8 0\cf0 \strokec4 , \cf8 \strokec8 1.2\cf0 \strokec4 , \cf8 \strokec8 1\cf0 \strokec4 ] \}\}\cb1 \
\cb3     transition=\{\{ \cf2 \strokec2 type\cf0 \strokec4 : \cf5 \strokec5 'spring'\cf0 \strokec4  \}\}\cb1 \
\cb3   >\cb1 \
\cb3     \cf7 \strokec7 LEVEL\cf0 \strokec4  \cf7 \strokec7 UP\cf0 \strokec4 !\cb1 \
\cb3   </motion.div>\cb1 \
\cb3 </motion.div>\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Confetti burst with react-confetti-explosion\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0

\f1\b \cf0 \cb3 **Progress Bars:**
\f0\b0 \cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```typescript\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Smooth width transition\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 <motion.div\cb1 \
\cb3   initial=\{\{ width: \cf8 \strokec8 0\cf0 \strokec4  \}\}\cb1 \
\cb3   animate=\{\{ width: \cf5 \strokec5 `\cf0 \strokec4 $\{progress\}\cf5 \strokec5 %`\cf0 \strokec4  \}\}\cb1 \
\cb3   transition=\{\{ duration: \cf8 \strokec8 1\cf0 \strokec4 , ease: \cf5 \strokec5 'easeOut'\cf0 \strokec4  \}\}\cb1 \
\cb3 />\cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0

\f1\b \cf0 \cb3 **Loading Skeletons:**
\f0\b0 \cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```typescript\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Shimmer effect\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 <motion.div\cb1 \
\cb3   animate=\{\{ backgroundPosition: [\cf5 \strokec5 '200% 0'\cf0 \strokec4 , \cf5 \strokec5 '-200% 0'\cf0 \strokec4 ] \}\}\cb1 \
\cb3   transition=\{\{ repeat: \cf7 \strokec7 Infinity\cf0 \strokec4 , duration: \cf8 \strokec8 2\cf0 \strokec4  \}\}\cb1 \
\cb3   style=\{\{ backgroundImage: \cf5 \strokec5 'linear-gradient(90deg, ...)'\cf0 \strokec4  \}\}\cb1 \
\cb3 />\cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 #### Icons Usage (Lucide React)\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Backend: \cf9 \strokec9 `Shield`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Frontend: \cf9 \strokec9 `Layout`\cf0 \strokec4  or \cf9 \strokec9 `Code2`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Mobile: \cf9 \strokec9 `Smartphone`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 DevOps: \cf9 \strokec9 `Server`\cf0 \strokec4  or \cf9 \strokec9 `Cloud`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Quest: \cf9 \strokec9 `ScrollText`\cf0 \strokec4  or \cf9 \strokec9 `Sword`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Boss: \cf9 \strokec9 `Skull`\cf0 \strokec4  or \cf9 \strokec9 `Target`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Add: \cf9 \strokec9 `Plus`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Edit: \cf9 \strokec9 `Pencil`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Delete: \cf9 \strokec9 `Trash2`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Link: \cf9 \strokec9 `ExternalLink`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Close: \cf9 \strokec9 `X`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Check: \cf9 \strokec9 `Check`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Lock: \cf9 \strokec9 `Lock`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Flame: \cf9 \strokec9 `Flame`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Loading: \cf9 \strokec9 `Loader2`\cf0 \strokec4  (with spin animation)\cb1 \
\
\cf2 \cb3 \strokec2 #### Responsive Breakpoints\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Mobile: \cf9 \strokec9 `< 640px`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Single column layouts\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Bottom sheet modals\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Stacked navigation\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Tablet: \cf9 \strokec9 `640px - 1024px`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Two column grids\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Side drawer modals\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Compact navigation\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Desktop: \cf9 \strokec9 `> 1024px`\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Multi-column layouts\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Centered modals\cb1 \
\cf2 \cb3 \strokec2   - \cf0 \strokec4 Full navigation\cb1 \
\
\cf2 \cb3 \strokec2 #### Accessibility\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Semantic HTML (\cf9 \strokec9 `<main>`\cf0 \strokec4 , \cf9 \strokec9 `<section>`\cf0 \strokec4 , \cf9 \strokec9 `<article>`\cf0 \strokec4 )\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 ARIA labels on all interactive elements\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Keyboard navigation (Tab, Enter, Escape)\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Focus-visible rings on all focusable elements\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Screen reader announcements for dynamic content\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Color contrast WCAG AA minimum\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Form labels and error associations\cb1 \
\cf2 \cb3 \strokec2 - \cf0 \strokec4 Loading announcements ("Loading quests...")\cb1 \
\
\cf2 \cb3 \strokec2 ### 6. Component Architecture\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf9 \cb3 \strokec9 app/\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9500 \u9472 \u9472  login/\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9492 \u9472 \u9472  page.tsx                      # Login page\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9500 \u9472 \u9472  dashboard/\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9500 \u9472 \u9472  page.tsx                      # Dashboard (Client Component)\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9492 \u9472 \u9472  layout.tsx                    # Dashboard layout with auth check\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9500 \u9472 \u9472  components/\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9500 \u9472 \u9472  ui/                           # Shadcn UI components\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  button.tsx\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  card.tsx\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  dialog.tsx\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  input.tsx\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  select.tsx\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  slider.tsx\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  badge.tsx\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  toast.tsx\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  alert.tsx\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9492 \u9472 \u9472  skeleton.tsx\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9500 \u9472 \u9472  auth/\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  login-form.tsx            # Login form component\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9492 \u9472 \u9472  auth-guard.tsx            # Protected route wrapper\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9500 \u9472 \u9472  dashboard/\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  navbar.tsx                # Top navigation with logout\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472 \cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 profile-header.tsx        # Profile display with edit\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  stat-card.tsx             # Individual stat card\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  stat-grid.tsx             # Grid of 4 stat cards\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  quest-log.tsx             # Quest list container\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  quest-form-modal.tsx      # Create quest modal\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  quest-item.tsx            # Individual quest card\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  boss-tracker.tsx          # Active boss display\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  boss-form-modal.tsx       # Edit boss modal\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  boss-history.tsx          # Completed bosses grid\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9492 \u9472 \u9472  level-up-modal.tsx        # Level up celebration\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9500 \u9472 \u9472  skeletons/\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  stat-card-skeleton.tsx\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  quest-item-skeleton.tsx\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9500 \u9472 \u9472  boss-card-skeleton.tsx\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9474    \u9492 \u9472 \u9472  profile-skeleton.tsx\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9492 \u9472 \u9472  shared/\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474        \u9500 \u9472 \u9472  category-badge.tsx        # Category indicator\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474        \u9500 \u9472 \u9472  progress-bar.tsx          # Reusable progress bar\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474        \u9500 \u9472 \u9472  empty-state.tsx           # Empty state component\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474        \u9500 \u9472 \u9472  confirm-dialog.tsx        # Confirmation modal\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474        \u9500 \u9472 \u9472  error-alert.tsx           # Error display\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474        \u9492 \u9472 \u9472  loading-button.tsx        # Button with loading state\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9500 \u9472 \u9472  services/\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9492 \u9472 \u9472  mock-api.ts                   # Complete mock API layer\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9500 \u9472 \u9472  lib/\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9500 \u9472 \u9472  utils.ts                      # General utilities\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9500 \u9472 \u9472  transformers.ts               # Data transformers\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9500 \u9472 \u9472  calculations.ts               # XP & level calculations\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9500 \u9472 \u9472  validations.ts                # Zod schemas\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9500 \u9472 \u9472  constants.ts                  # App constants\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9492 \u9472 \u9472  storage.ts                    # LocalStorage helpers\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9500 \u9472 \u9472  hooks/\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9500 \u9472 \u9472  use-auth.ts                   # Auth state & functions\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9500 \u9472 \u9472  use-profile.ts                # Profile management\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9500 \u9472 \u9472  use-quests.ts                 # Quest CRUD with optimistic updates\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9500 \u9472 \u9472  use-bosses.ts                 # Boss CRUD with optimistic updates\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9474    \u9492 \u9472 \u9472  use-toast.ts                  # Toast notifications (Shadcn)\cf0 \cb1 \strokec4 \
\cf9 \cb3 \strokec9 \uc0\u9492 \u9472 \u9472  middleware.ts                     # Route protection\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 ### 7. Key Utilities & Functions\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```typescript\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // lib/calculations.ts\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 function\cf0 \strokec4  calculateLevel(totalMinutes: \cf2 \strokec2 number\cf0 \strokec4 ): \cf2 \strokec2 number\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 return\cf0 \strokec4  \cf7 \strokec7 Math\cf0 \strokec4 .floor(\cf7 \strokec7 Math\cf0 \strokec4 .sqrt(totalMinutes / \cf8 \strokec8 60\cf0 \strokec4 ));\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 function\cf0 \strokec4  calculateXpForNextLevel(currentLevel: \cf2 \strokec2 number\cf0 \strokec4 ): \cf2 \strokec2 number\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 return\cf0 \strokec4  \cf7 \strokec7 Math\cf0 \strokec4 .pow(currentLevel + \cf8 \strokec8 1\cf0 \strokec4 , \cf8 \strokec8 2\cf0 \strokec4 ) * \cf8 \strokec8 60\cf0 \strokec4 ;\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 function\cf0 \strokec4  getXpProgress(totalMinutes: \cf2 \strokec2 number\cf0 \strokec4 ): \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   currentLevel: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   currentLevelXp: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   nextLevelXp: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   xpToNextLevel: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   progressPercent: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3 \} \{\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  currentLevel = calculateLevel(totalMinutes);\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  currentLevelXp = \cf7 \strokec7 Math\cf0 \strokec4 .pow(currentLevel, \cf8 \strokec8 2\cf0 \strokec4 ) * \cf8 \strokec8 60\cf0 \strokec4 ;\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  nextLevelXp = calculateXpForNextLevel(currentLevel);\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  progressInLevel = totalMinutes - currentLevelXp;\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  xpNeededForLevel = nextLevelXp - currentLevelXp;\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  progressPercent = (progressInLevel / xpNeededForLevel) * \cf8 \strokec8 100\cf0 \strokec4 ;\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  xpToNextLevel = nextLevelXp - totalMinutes;\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 return\cf0 \strokec4  \{ \cb1 \
\cb3     currentLevel, \cb1 \
\cb3     currentLevelXp, \cb1 \
\cb3     nextLevelXp, \cb1 \
\cb3     xpToNextLevel,\cb1 \
\cb3     progressPercent \cb1 \
\cb3   \};\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 function\cf0 \strokec4  getCategoryStats(quests: \cf7 \strokec7 Quest\cf0 \strokec4 []): \cf7 \strokec7 Array\cf0 \strokec4 <\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   category: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   totalMinutes: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   percentage: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   color: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3 \}> \{\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  totals: \cf7 \strokec7 Record\cf0 \strokec4 <\cf2 \strokec2 string\cf0 \strokec4 , \cf2 \strokec2 number\cf0 \strokec4 > = \{\cb1 \
\cb3     \cf7 \strokec7 BACKEND\cf0 \strokec4 : \cf8 \strokec8 0\cf0 \strokec4 ,\cb1 \
\cb3     \cf7 \strokec7 FRONTEND\cf0 \strokec4 : \cf8 \strokec8 0\cf0 \strokec4 ,\cb1 \
\cb3     \cf7 \strokec7 MOBILE\cf0 \strokec4 : \cf8 \strokec8 0\cf0 \strokec4 ,\cb1 \
\cb3     \cf7 \strokec7 DEVOPS\cf0 \strokec4 : \cf8 \strokec8 0\cf0 \strokec4 ,\cb1 \
\cb3   \};\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 let\cf0 \strokec4  grandTotal = \cf8 \strokec8 0\cf0 \strokec4 ;\cb1 \
\cb3   \cb1 \
\cb3   quests.forEach(quest => \{\cb1 \
\cb3     totals[quest.category] += quest.durationMin;\cb1 \
\cb3     grandTotal += quest.durationMin;\cb1 \
\cb3   \});\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 return\cf0 \strokec4  \cf7 \strokec7 Object\cf0 \strokec4 .entries(totals).map(([category, minutes]) => (\{\cb1 \
\cb3     category,\cb1 \
\cb3     totalMinutes: minutes,\cb1 \
\cb3     percentage: grandTotal > \cf8 \strokec8 0\cf0 \strokec4  ? (minutes / grandTotal) * \cf8 \strokec8 100\cf0 \strokec4  : \cf8 \strokec8 0\cf0 \strokec4 ,\cb1 \
\cb3     color: \cf7 \strokec7 CATEGORIES\cf0 \strokec4 [category \cf2 \strokec2 as\cf0 \strokec4  \cf2 \strokec2 keyof\cf0 \strokec4  \cf2 \strokec2 typeof\cf0 \strokec4  \cf7 \strokec7 CATEGORIES\cf0 \strokec4 ].color,\cb1 \
\cb3   \}));\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 function\cf0 \strokec4  formatDuration(minutes: \cf2 \strokec2 number\cf0 \strokec4 ): \cf2 \strokec2 string\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 if\cf0 \strokec4  (minutes < \cf8 \strokec8 60\cf0 \strokec4 ) \cf2 \strokec2 return\cf0 \strokec4  \cf5 \strokec5 `\cf0 \strokec4 $\{minutes\}\cf5 \strokec5  min`\cf0 \strokec4 ;\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  hours = \cf7 \strokec7 Math\cf0 \strokec4 .floor(minutes / \cf8 \strokec8 60\cf0 \strokec4 );\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  mins = minutes % \cf8 \strokec8 60\cf0 \strokec4 ;\cb1 \
\cb3   \cf2 \strokec2 return\cf0 \strokec4  mins > \cf8 \strokec8 0\cf0 \strokec4  ? \cf5 \strokec5 `\cf0 \strokec4 $\{hours\}\cf5 \strokec5 h \cf0 \strokec4 $\{mins\}\cf5 \strokec5 m`\cf0 \strokec4  : \cf5 \strokec5 `\cf0 \strokec4 $\{hours\}\cf5 \strokec5 h`\cf0 \strokec4 ;\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 function\cf0 \strokec4  getRelativeTime(dateString: \cf2 \strokec2 string\cf0 \strokec4 ): \cf2 \strokec2 string\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 const\cf0 \strokec4  date = \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Date\cf0 \strokec4 (dateString);\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  now = \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Date\cf0 \strokec4 ();\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  diffMs = now.getTime() - date.getTime();\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  diffMins = \cf7 \strokec7 Math\cf0 \strokec4 .floor(diffMs / \cf8 \strokec8 60000\cf0 \strokec4 );\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  diffHours = \cf7 \strokec7 Math\cf0 \strokec4 .floor(diffMins / \cf8 \strokec8 60\cf0 \strokec4 );\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  diffDays = \cf7 \strokec7 Math\cf0 \strokec4 .floor(diffHours / \cf8 \strokec8 24\cf0 \strokec4 );\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (diffMins < \cf8 \strokec8 1\cf0 \strokec4 ) \cf2 \strokec2 return\cf0 \strokec4  \cf5 \strokec5 'Just now'\cf0 \strokec4 ;\cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (diffMins < \cf8 \strokec8 60\cf0 \strokec4 ) \cf2 \strokec2 return\cf0 \strokec4  \cf5 \strokec5 `\cf0 \strokec4 $\{diffMins\}\cf5 \strokec5  minute\cf0 \strokec4 $\{diffMins > \cf8 \strokec8 1\cf0 \strokec4  ? \cf5 \strokec5 's'\cf0 \strokec4  : \cf5 \strokec5 ''\cf0 \strokec4 \}\cf5 \strokec5  ago`\cf0 \strokec4 ;\cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (diffHours < \cf8 \strokec8 24\cf0 \strokec4 ) \cf2 \strokec2 return\cf0 \strokec4  \cf5 \strokec5 `\cf0 \strokec4 $\{diffHours\}\cf5 \strokec5  hour\cf0 \strokec4 $\{diffHours > \cf8 \strokec8 1\cf0 \strokec4  ? \cf5 \strokec5 's'\cf0 \strokec4  : \cf5 \strokec5 ''\cf0 \strokec4 \}\cf5 \strokec5  ago`\cf0 \strokec4 ;\cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (diffDays === \cf8 \strokec8 1\cf0 \strokec4 ) \cf2 \strokec2 return\cf0 \strokec4  \cf5 \strokec5 'Yesterday'\cf0 \strokec4 ;\cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (diffDays < \cf8 \strokec8 7\cf0 \strokec4 ) \cf2 \strokec2 return\cf0 \strokec4  \cf5 \strokec5 `\cf0 \strokec4 $\{diffDays\}\cf5 \strokec5  days ago`\cf0 \strokec4 ;\cb1 \
\cb3   \cf2 \strokec2 return\cf0 \strokec4  date.toLocaleDateString();\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // lib/validations.ts\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 import\cf0 \strokec4  \{ z \} \cf2 \strokec2 from\cf0 \strokec4  \cf5 \strokec5 'zod'\cf0 \strokec4 ;\cb1 \
\
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  loginSchema = z.\cf2 \strokec2 object\cf0 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   email: z.\cf2 \strokec2 string\cf0 \strokec4 ().email(\cf5 \strokec5 'Invalid email address'\cf0 \strokec4 ),\cb1 \
\cb3   password: z.\cf2 \strokec2 string\cf0 \strokec4 ().min(\cf8 \strokec8 1\cf0 \strokec4 , \cf5 \strokec5 'Password is required'\cf0 \strokec4 ),\cb1 \
\cb3 \});\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  profileSchema = z.\cf2 \strokec2 object\cf0 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   username: z.\cf2 \strokec2 string\cf0 \strokec4 ().min(\cf8 \strokec8 1\cf0 \strokec4 , \cf5 \strokec5 'Username is required'\cf0 \strokec4 ).max(\cf8 \strokec8 50\cf0 \strokec4 ),\cb1 \
\cb3   avatar_url: z.\cf2 \strokec2 string\cf0 \strokec4 ().url(\cf5 \strokec5 'Invalid URL'\cf0 \strokec4 ).optional().or(z.literal(\cf5 \strokec5 ''\cf0 \strokec4 )),\cb1 \
\cb3 \});\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  questSchema = z.\cf2 \strokec2 object\cf0 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   title: z.\cf2 \strokec2 string\cf0 \strokec4 ().min(\cf8 \strokec8 1\cf0 \strokec4 , \cf5 \strokec5 'Title is required'\cf0 \strokec4 ).max(\cf8 \strokec8 100\cf0 \strokec4 ),\cb1 \
\cb3   description: z.\cf2 \strokec2 string\cf0 \strokec4 ().max(\cf8 \strokec8 500\cf0 \strokec4 ).optional().or(z.literal(\cf5 \strokec5 ''\cf0 \strokec4 )),\cb1 \
\cb3   duration_min: z.\cf2 \strokec2 number\cf0 \strokec4 ().min(\cf8 \strokec8 1\cf0 \strokec4 , \cf5 \strokec5 'Must be at least 1 minute'\cf0 \strokec4 ).max(\cf8 \strokec8 1440\cf0 \strokec4 , \cf5 \strokec5 'Cannot exceed 24 hours'\cf0 \strokec4 ),\cb1 \
\cb3   category: z.\cf2 \strokec2 enum\cf0 \strokec4 ([\cf5 \strokec5 'BACKEND'\cf0 \strokec4 , \cf5 \strokec5 'FRONTEND'\cf0 \strokec4 , \cf5 \strokec5 'MOBILE'\cf0 \strokec4 , \cf5 \strokec5 'DEVOPS'\cf0 \strokec4 ]),\cb1 \
\cb3 \});\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  bossSchema = z.\cf2 \strokec2 object\cf0 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   title: z.\cf2 \strokec2 string\cf0 \strokec4 ().min(\cf8 \strokec8 1\cf0 \strokec4 , \cf5 \strokec5 'Title is required'\cf0 \strokec4 ).max(\cf8 \strokec8 100\cf0 \strokec4 ),\cb1 \
\cb3   quarter: z.\cf2 \strokec2 number\cf0 \strokec4 ().min(\cf8 \strokec8 1\cf0 \strokec4 ).max(\cf8 \strokec8 4\cf0 \strokec4 ),\cb1 \
\cb3   progress: z.\cf2 \strokec2 number\cf0 \strokec4 ().min(\cf8 \strokec8 0\cf0 \strokec4 ).max(\cf8 \strokec8 100\cf0 \strokec4 ),\cb1 \
\cb3   status: z.\cf2 \strokec2 enum\cf0 \strokec4 ([\cf5 \strokec5 'LOCKED'\cf0 \strokec4 , \cf5 \strokec5 'ACTIVE'\cf0 \strokec4 , \cf5 \strokec5 'COMPLETED'\cf0 \strokec4 , \cf5 \strokec5 'FAILED'\cf0 \strokec4 ]),\cb1 \
\cb3   repo_url: z.\cf2 \strokec2 string\cf0 \strokec4 ().url(\cf5 \strokec5 'Invalid URL'\cf0 \strokec4 ).optional().or(z.literal(\cf5 \strokec5 ''\cf0 \strokec4 )),\cb1 \
\cb3   deploy_url: z.\cf2 \strokec2 string\cf0 \strokec4 ().url(\cf5 \strokec5 'Invalid URL'\cf0 \strokec4 ).optional().or(z.literal(\cf5 \strokec5 ''\cf0 \strokec4 )),\cb1 \
\cb3 \});\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // lib/constants.ts\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  \cf7 \strokec7 CATEGORIES\cf0 \strokec4  = \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf7 \strokec7 BACKEND\cf0 \strokec4 : \{ \cb1 \
\cb3     label: \cf5 \strokec5 'Backend'\cf0 \strokec4 , \cb1 \
\cb3     icon: \cf5 \strokec5 'Shield'\cf0 \strokec4 , \cb1 \
\cb3     color: \cf5 \strokec5 'blue'\cf0 \strokec4 ,\cb1 \
\cb3     description: \cf5 \strokec5 'Server, APIs, Databases'\cf0 \cb1 \strokec4 \
\cb3   \},\cb1 \
\cb3   \cf7 \strokec7 FRONTEND\cf0 \strokec4 : \{ \cb1 \
\cb3     label: \cf5 \strokec5 'Frontend'\cf0 \strokec4 , \cb1 \
\cb3     icon: \cf5 \strokec5 'Layout'\cf0 \strokec4 , \cb1 \
\cb3     color: \cf5 \strokec5 'purple'\cf0 \strokec4 ,\cb1 \
\cb3     description: \cf5 \strokec5 'React, Next.js, UI/UX'\cf0 \cb1 \strokec4 \
\cb3   \},\cb1 \
\cb3   \cf7 \strokec7 MOBILE\cf0 \strokec4 : \{ \cb1 \
\cb3     label: \cf5 \strokec5 'Mobile'\cf0 \strokec4 , \cb1 \
\cb3     icon: \cf5 \strokec5 'Smartphone'\cf0 \strokec4 , \cb1 \
\cb3     color: \cf5 \strokec5 'pink'\cf0 \strokec4 ,\cb1 \
\cb3     description: \cf5 \strokec5 'React Native, iOS, Android'\cf0 \cb1 \strokec4 \
\cb3   \},\cb1 \
\cb3   \cf7 \strokec7 DEVOPS\cf0 \strokec4 : \{ \cb1 \
\cb3     label: \cf5 \strokec5 'DevOps'\cf0 \strokec4 , \cb1 \
\cb3     icon: \cf5 \strokec5 'Server'\cf0 \strokec4 , \cb1 \
\cb3     color: \cf5 \strokec5 'amber'\cf0 \strokec4 ,\cb1 \
\cb3     description: \cf5 \strokec5 'CI/CD, Docker, Cloud'\cf0 \cb1 \strokec4 \
\cb3   \},\cb1 \
\cb3 \} \cf2 \strokec2 as\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  \cf7 \strokec7 QUARTERS\cf0 \strokec4  = [\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \{ value: \cf8 \strokec8 1\cf0 \strokec4 , label: \cf5 \strokec5 'Q1'\cf0 \strokec4 , months: \cf5 \strokec5 'Jan - Mar'\cf0 \strokec4  \},\cb1 \
\cb3   \{ value: \cf8 \strokec8 2\cf0 \strokec4 , label: \cf5 \strokec5 'Q2'\cf0 \strokec4 , months: \cf5 \strokec5 'Apr - Jun'\cf0 \strokec4  \},\cb1 \
\cb3   \{ value: \cf8 \strokec8 3\cf0 \strokec4 , label: \cf5 \strokec5 'Q3'\cf0 \strokec4 , months: \cf5 \strokec5 'Jul - Sep'\cf0 \strokec4  \},\cb1 \
\cb3   \{ value: \cf8 \strokec8 4\cf0 \strokec4 , label: \cf5 \strokec5 'Q4'\cf0 \strokec4 , months: \cf5 \strokec5 'Oct - Dec'\cf0 \strokec4  \},\cb1 \
\cb3 ] \cf2 \strokec2 as\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  \cf7 \strokec7 STATUS_CONFIG\cf0 \strokec4  = \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf7 \strokec7 LOCKED\cf0 \strokec4 : \{ label: \cf5 \strokec5 'Locked'\cf0 \strokec4 , color: \cf5 \strokec5 'gray'\cf0 \strokec4 , icon: \cf5 \strokec5 'Lock'\cf0 \strokec4  \},\cb1 \
\cb3   \cf7 \strokec7 ACTIVE\cf0 \strokec4 : \{ label: \cf5 \strokec5 'Active'\cf0 \strokec4 , color: \cf5 \strokec5 'blue'\cf0 \strokec4 , icon: \cf5 \strokec5 'Flame'\cf0 \strokec4  \},\cb1 \
\cb3   \cf7 \strokec7 COMPLETED\cf0 \strokec4 : \{ label: \cf5 \strokec5 'Completed'\cf0 \strokec4 , color: \cf5 \strokec5 'green'\cf0 \strokec4 , icon: \cf5 \strokec5 'Check'\cf0 \strokec4  \},\cb1 \
\cb3   \cf7 \strokec7 FAILED\cf0 \strokec4 : \{ label: \cf5 \strokec5 'Failed'\cf0 \strokec4 , color: \cf5 \strokec5 'red'\cf0 \strokec4 , icon: \cf5 \strokec5 'X'\cf0 \strokec4  \},\cb1 \
\cb3 \} \cf2 \strokec2 as\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  \cf7 \strokec7 STORAGE_KEYS\cf0 \strokec4  = \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf7 \strokec7 AUTH_TOKEN\cf0 \strokec4 : \cf5 \strokec5 'odyssey_auth_token'\cf0 \strokec4 ,\cb1 \
\cb3   \cf7 \strokec7 PROFILE\cf0 \strokec4 : \cf5 \strokec5 'odyssey_profile_data'\cf0 \strokec4 ,\cb1 \
\cb3   \cf7 \strokec7 QUESTS\cf0 \strokec4 : \cf5 \strokec5 'odyssey_quests_data'\cf0 \strokec4 ,\cb1 \
\cb3   \cf7 \strokec7 BOSSES\cf0 \strokec4 : \cf5 \strokec5 'odyssey_bosses_data'\cf0 \strokec4 ,\cb1 \
\cb3 \} \cf2 \strokec2 as\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  \cf7 \strokec7 MOCK_CREDENTIALS\cf0 \strokec4  = \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf7 \strokec7 EMAIL\cf0 \strokec4 : \cf5 \strokec5 'superadmin@gmail.com'\cf0 \strokec4 ,\cb1 \
\cb3   \cf7 \strokec7 PASSWORD\cf0 \strokec4 : \cf5 \strokec5 '123456'\cf0 \strokec4 ,\cb1 \
\cb3 \} \cf2 \strokec2 as\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4 ;\cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 ### 8. Custom Hooks with Optimistic Updates\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```typescript\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // hooks/use-auth.ts\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 function\cf0 \strokec4  useAuth() \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 const\cf0 \strokec4  [user, setUser] = useState<\cf7 \strokec7 AuthResponse\cf0 \strokec4 [\cf5 \strokec5 'user'\cf0 \strokec4 ] | \cf2 \strokec2 null\cf0 \strokec4 >(\cf2 \strokec2 null\cf0 \strokec4 );\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  [isLoading, setIsLoading] = useState(\cf2 \strokec2 true\cf0 \strokec4 );\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  [isAuthenticated, setIsAuthenticated] = useState(\cf2 \strokec2 false\cf0 \strokec4 );\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  \{ toast \} = useToast();\cb1 \
\cb3   \cb1 \
\cb3   \cf6 \strokec6 // Check auth on mount\cf0 \cb1 \strokec4 \
\cb3   useEffect(() => \{\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  token = localStorage.getItem(\cf7 \strokec7 STORAGE_KEYS\cf0 \strokec4 .\cf7 \strokec7 AUTH_TOKEN\cf0 \strokec4 );\cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (token) \{\cb1 \
\cb3       authApi.validateToken(token).then(response => \{\cb1 \
\cb3         \cf2 \strokec2 if\cf0 \strokec4  (response.success) \{\cb1 \
\cb3           \cf6 \strokec6 // Token valid, fetch user info\cf0 \cb1 \strokec4 \
\cb3           \cf2 \strokec2 const\cf0 \strokec4  userData = \cf7 \strokec7 JSON\cf0 \strokec4 .parse(atob(token.split(\cf5 \strokec5 '.'\cf0 \strokec4 )[\cf8 \strokec8 1\cf0 \strokec4 ] || \cf5 \strokec5 '\{\}'\cf0 \strokec4 ));\cb1 \
\cb3           setUser(\{\cb1 \
\cb3             user_id: userData.user_id,\cb1 \
\cb3             email: userData.email,\cb1 \
\cb3             username: \cf5 \strokec5 'SkillSeeker'\cf0 \strokec4 , \cf6 \strokec6 // From profile\cf0 \cb1 \strokec4 \
\cb3           \});\cb1 \
\cb3           setIsAuthenticated(\cf2 \strokec2 true\cf0 \strokec4 );\cb1 \
\cb3         \} \cf2 \strokec2 else\cf0 \strokec4  \{\cb1 \
\cb3           \cf6 \strokec6 // Token expired\cf0 \cb1 \strokec4 \
\cb3           localStorage.removeItem(\cf7 \strokec7 STORAGE_KEYS\cf0 \strokec4 .\cf7 \strokec7 AUTH_TOKEN\cf0 \strokec4 );\cb1 \
\cb3           setIsAuthenticated(\cf2 \strokec2 false\cf0 \strokec4 );\cb1 \
\cb3         \}\cb1 \
\cb3         setIsLoading(\cf2 \strokec2 false\cf0 \strokec4 );\cb1 \
\cb3       \});\cb1 \
\cb3     \} \cf2 \strokec2 else\cf0 \strokec4  \{\cb1 \
\cb3       setIsLoading(\cf2 \strokec2 false\cf0 \strokec4 );\cb1 \
\cb3     \}\cb1 \
\cb3   \}, []);\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  login = \cf2 \strokec2 async\cf0 \strokec4  (email: \cf2 \strokec2 string\cf0 \strokec4 , password: \cf2 \strokec2 string\cf0 \strokec4 ) => \{\cb1 \
\cb3     setIsLoading(\cf2 \strokec2 true\cf0 \strokec4 );\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  response = \cf2 \strokec2 await\cf0 \strokec4  authApi.login(email, password);\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (response.success && response.data) \{\cb1 \
\cb3       localStorage.setItem(\cf7 \strokec7 STORAGE_KEYS\cf0 \strokec4 .\cf7 \strokec7 AUTH_TOKEN\cf0 \strokec4 , response.data.token);\cb1 \
\cb3       setUser(response.data.user);\cb1 \
\cb3       setIsAuthenticated(\cf2 \strokec2 true\cf0 \strokec4 );\cb1 \
\cb3       toast(\{ title: \cf5 \strokec5 'Welcome back!'\cf0 \strokec4 , variant: \cf5 \strokec5 'success'\cf0 \strokec4  \});\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 true\cf0 \strokec4  \};\cb1 \
\cb3     \} \cf2 \strokec2 else\cf0 \strokec4  \{\cb1 \
\cb3       toast(\{ \cb1 \
\cb3         title: \cf5 \strokec5 'Login failed'\cf0 \strokec4 , \cb1 \
\cb3         description: response.error,\cb1 \
\cb3         variant: \cf5 \strokec5 'destructive'\cf0 \strokec4  \cb1 \
\cb3       \});\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 false\cf0 \strokec4 , error: response.error \};\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     setIsLoading(\cf2 \strokec2 false\cf0 \strokec4 );\cb1 \
\cb3   \};\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  logout = \cf2 \strokec2 async\cf0 \strokec4  () => \{\cb1 \
\cb3     \cf2 \strokec2 await\cf0 \strokec4  authApi.logout();\cb1 \
\cb3     localStorage.clear(); \cf6 \strokec6 // Clear all app data\cf0 \cb1 \strokec4 \
\cb3     setUser(\cf2 \strokec2 null\cf0 \strokec4 );\cb1 \
\cb3     setIsAuthenticated(\cf2 \strokec2 false\cf0 \strokec4 );\cb1 \
\cb3     toast(\{ title: \cf5 \strokec5 'Logged out successfully'\cf0 \strokec4  \});\cb1 \
\cb3   \};\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 return\cf0 \strokec4  \{ user, isAuthenticated, isLoading, login, logout \};\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // hooks/use-quests.ts\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 function\cf0 \strokec4  useQuests() \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 const\cf0 \strokec4  [quests, setQuests] = useState<\cf7 \strokec7 Quest\cf0 \strokec4 []>([]);\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  [isLoading, setIsLoading] = useState(\cf2 \strokec2 true\cf0 \strokec4 );\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  \{ toast \} = useToast();\cb1 \
\cb3   \cb1 \
\cb3   \cf6 \strokec6 // Fetch quests on mount\cf0 \cb1 \strokec4 \
\cb3   useEffect(() => \{\cb1 \
\cb3     fetchQuests();\cb1 \
\cb3   \}, []);\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  fetchQuests = \cf2 \strokec2 async\cf0 \strokec4  () => \{\cb1 \
\cb3     setIsLoading(\cf2 \strokec2 true\cf0 \strokec4 );\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  response = \cf2 \strokec2 await\cf0 \strokec4  questApi.getQuests();\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (response.success && response.data) \{\cb1 \
\cb3       setQuests(response.data.map(transformQuestData));\cb1 \
\cb3     \}\cb1 \
\cb3     setIsLoading(\cf2 \strokec2 false\cf0 \strokec4 );\cb1 \
\cb3   \};\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  createQuest = \cf2 \strokec2 async\cf0 \strokec4  (questData: \cf7 \strokec7 Omit\cf0 \strokec4 <\cf7 \strokec7 Quest\cf0 \strokec4 , \cf5 \strokec5 'questId'\cf0 \strokec4  | \cf5 \strokec5 'createdAt'\cf0 \strokec4 >) => \{\cb1 \
\cb3     \cf6 \strokec6 // Optimistic update\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  optimisticQuest: \cf7 \strokec7 Quest\cf0 \strokec4  = \{\cb1 \
\cb3       questId: \cf5 \strokec5 `temp-\cf0 \strokec4 $\{\cf7 \strokec7 Date\cf0 \strokec4 .now()\}\cf5 \strokec5 `\cf0 \strokec4 ,\cb1 \
\cb3       createdAt: \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Date\cf0 \strokec4 ().toISOString(),\cb1 \
\cb3       ...questData,\cb1 \
\cb3     \};\cb1 \
\cb3     \cb1 \
\cb3     setQuests(prev => [optimisticQuest, ...prev]);\cb1 \
\cb3     \cb1 \
\cb3     \cf6 \strokec6 // API call\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  response = \cf2 \strokec2 await\cf0 \strokec4  withRateLimit(\cb1 \
\cb3       \cf5 \strokec5 'create-quest'\cf0 \strokec4 ,\cb1 \
\cb3       () => questApi.createQuest(toQuestData(questData))\cb1 \
\cb3     );\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (response.success && response.data) \{\cb1 \
\cb3       \cf6 \strokec6 // Replace optimistic with real data\cf0 \cb1 \strokec4 \
\cb3       setQuests(prev => \cb1 \
\cb3         prev.map(q => \cb1 \
\cb3           q.questId === optimisticQuest.questId \cb1 \
\cb3             ? transformQuestData(response.data!)\cb1 \
\cb3             : q\cb1 \
\cb3         )\cb1 \
\cb3       );\cb1 \
\cb3       toast(\{ title: \cf5 \strokec5 'Quest logged!'\cf0 \strokec4 , variant: \cf5 \strokec5 'success'\cf0 \strokec4  \});\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 true\cf0 \strokec4 , data: transformQuestData(response.data) \};\cb1 \
\cb3     \} \cf2 \strokec2 else\cf0 \strokec4  \{\cb1 \
\cb3       \cf6 \strokec6 // Rollback on error\cf0 \cb1 \strokec4 \
\cb3       setQuests(prev => prev.filter(q => q.questId !== optimisticQuest.questId));\cb1 \
\cb3       toast(\{ \cb1 \
\cb3         title: \cf5 \strokec5 'Failed to log quest'\cf0 \strokec4 ,\cb1 \
\cb3         description: response.error,\cb1 \
\cb3         variant: \cf5 \strokec5 'destructive'\cf0 \strokec4  \cb1 \
\cb3       \});\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \{ success: \cf2 \strokec2 false\cf0 \strokec4 , error: response.error \};\cb1 \
\cb3     \}\cb1 \
\cb3   \};\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  deleteQuest = \cf2 \strokec2 async\cf0 \strokec4  (questId: \cf2 \strokec2 string\cf0 \strokec4 ) => \{\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  deletedQuest = quests.find(q => q.questId === questId);\cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (!deletedQuest) \cf2 \strokec2 return\cf0 \strokec4 ;\cb1 \
\cb3     \cb1 \
\cb3     \cf6 \strokec6 // Optimistic update\cf0 \cb1 \strokec4 \
\cb3     setQuests(prev => prev.filter(q => q.questId !== questId));\cb1 \
\cb3     \cb1 \
\cb3     \cf6 \strokec6 // API call\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  response = \cf2 \strokec2 await\cf0 \strokec4  questApi.deleteQuest(questId);\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (response.success) \{\cb1 \
\cb3       toast(\{ title: \cf5 \strokec5 'Quest deleted'\cf0 \strokec4 , variant: \cf5 \strokec5 'success'\cf0 \strokec4  \});\cb1 \
\cb3     \} \cf2 \strokec2 else\cf0 \strokec4  \{\cb1 \
\cb3       \cf6 \strokec6 // Rollback\cf0 \cb1 \strokec4 \
\cb3       setQuests(prev => [deletedQuest, ...prev]);\cb1 \
\cb3       toast(\{ \cb1 \
\cb3         title: \cf5 \strokec5 'Failed to delete quest'\cf0 \strokec4 ,\cb1 \
\cb3         description: response.error,\cb1 \
\cb3         variant: \cf5 \strokec5 'destructive'\cf0 \strokec4  \cb1 \
\cb3       \});\cb1 \
\cb3     \}\cb1 \
\cb3   \};\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  getRecentQuests = (limit: \cf2 \strokec2 number\cf0 \strokec4  = \cf8 \strokec8 10\cf0 \strokec4 ) => \{\cb1 \
\cb3     \cf2 \strokec2 return\cf0 \strokec4  quests.slice(\cf8 \strokec8 0\cf0 \strokec4 , limit);\cb1 \
\cb3   \};\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 return\cf0 \strokec4  \{ \cb1 \
\cb3     quests, \cb1 \
\cb3     isLoading, \cb1 \
\cb3     createQuest, \cb1 \
\cb3     deleteQuest, \cb1 \
\cb3     getRecentQuests,\cb1 \
\cb3     refetch: fetchQuests \cb1 \
\cb3   \};\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // hooks/use-bosses.ts\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 function\cf0 \strokec4  useBosses() \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf6 \strokec6 // Similar structure to useQuests\cf0 \cb1 \strokec4 \
\cb3   \cf6 \strokec6 // Implements: getBosses, createBoss, updateBoss, deleteBoss\cf0 \cb1 \strokec4 \
\cb3   \cf6 \strokec6 // With optimistic updates\cf0 \cb1 \strokec4 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // hooks/use-profile.ts\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 function\cf0 \strokec4  useProfile() \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf6 \strokec6 // Implements: getProfile, updateProfile\cf0 \cb1 \strokec4 \
\cb3   \cf6 \strokec6 // Tracks totalXp and currentLevel\cf0 \cb1 \strokec4 \
\cb3   \cf6 \strokec6 // Triggers level up modal when level increases\cf0 \cb1 \strokec4 \
\cb3 \}\cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 ### 9. Mock Data for Development\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```typescript\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // lib/mock-data.ts\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  \cf7 \strokec7 MOCK_PROFILE_DATA\cf0 \strokec4 : \cf7 \strokec7 ProfileData\cf0 \strokec4  = \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   user_id: \cf5 \strokec5 'mock-user-1'\cf0 \strokec4 ,\cb1 \
\cb3   username: \cf5 \strokec5 'SkillSeeker'\cf0 \strokec4 ,\cb1 \
\cb3   avatar_url: \cf5 \strokec5 'https://api.dicebear.com/7.x/avataaars/svg?seed=SkillSeeker'\cf0 \strokec4 ,\cb1 \
\cb3   total_xp: \cf8 \strokec8 0\cf0 \strokec4 ,\cb1 \
\cb3   current_level: \cf8 \strokec8 1\cf0 \strokec4 ,\cb1 \
\cb3   created_at: \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Date\cf0 \strokec4 ().toISOString(),\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  \cf7 \strokec7 MOCK_QUESTS_DATA\cf0 \strokec4 : \cf7 \strokec7 QuestData\cf0 \strokec4 [] = [\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \{\cb1 \
\cb3     quest_id: \cf5 \strokec5 'quest_1'\cf0 \strokec4 ,\cb1 \
\cb3     title: \cf5 \strokec5 'Built RESTful API with Express'\cf0 \strokec4 ,\cb1 \
\cb3     description: \cf5 \strokec5 'Created CRUD endpoints for user management with JWT auth'\cf0 \strokec4 ,\cb1 \
\cb3     duration_min: \cf8 \strokec8 120\cf0 \strokec4 ,\cb1 \
\cb3     category: \cf5 \strokec5 'BACKEND'\cf0 \strokec4 ,\cb1 \
\cb3     created_at: \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Date\cf0 \strokec4 (\cf7 \strokec7 Date\cf0 \strokec4 .now() - \cf8 \strokec8 3600000\cf0 \strokec4 ).toISOString(), \cf6 \strokec6 // 1 hour ago\cf0 \cb1 \strokec4 \
\cb3   \},\cb1 \
\cb3   \{\cb1 \
\cb3     quest_id: \cf5 \strokec5 'quest_2'\cf0 \strokec4 ,\cb1 \
\cb3     title: \cf5 \strokec5 'Designed landing page in Figma'\cf0 \strokec4 ,\cb1 \
\cb3     description: \cf5 \strokec5 'Created high-fidelity mockups with component library'\cf0 \strokec4 ,\cb1 \
\cb3     duration_min: \cf8 \strokec8 90\cf0 \strokec4 ,\cb1 \
\cb3     category: \cf5 \strokec5 'FRONTEND'\cf0 \strokec4 ,\cb1 \
\cb3     created_at: \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Date\cf0 \strokec4 (\cf7 \strokec7 Date\cf0 \strokec4 .now() - \cf8 \strokec8 7200000\cf0 \strokec4 ).toISOString(), \cf6 \strokec6 // 2 hours ago\cf0 \cb1 \strokec4 \
\cb3   \},\cb1 \
\cb3   \{\cb1 \
\cb3     quest_id: \cf5 \strokec5 'quest_3'\cf0 \strokec4 ,\cb1 \
\cb3     title: \cf5 \strokec5 'Implemented navigation in React Native'\cf0 \strokec4 ,\cb1 \
\cb3     description: \cf5 \strokec5 'Set up React Navigation with tab and stack navigators'\cf0 \strokec4 ,\cb1 \
\cb3     duration_min: \cf8 \strokec8 60\cf0 \strokec4 ,\cb1 \
\cb3     category: \cf5 \strokec5 'MOBILE'\cf0 \strokec4 ,\cb1 \
\cb3     created_at: \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Date\cf0 \strokec4 (\cf7 \strokec7 Date\cf0 \strokec4 .now() - \cf8 \strokec8 86400000\cf0 \strokec4 ).toISOString(), \cf6 \strokec6 // 1 day ago\cf0 \cb1 \strokec4 \
\cb3   \},\cb1 \
\cb3   \{\cb1 \
\cb3     quest_id: \cf5 \strokec5 'quest_4'\cf0 \strokec4 ,\cb1 \
\cb3     title: \cf5 \strokec5 'Configured CI/CD pipeline'\cf0 \strokec4 ,\cb1 \
\cb3     description: \cf5 \strokec5 'Set up GitHub Actions for automated testing and deployment'\cf0 \strokec4 ,\cb1 \
\cb3     duration_min: \cf8 \strokec8 75\cf0 \strokec4 ,\cb1 \
\cb3     category: \cf5 \strokec5 'DEVOPS'\cf0 \strokec4 ,\cb1 \
\cb3     created_at: \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Date\cf0 \strokec4 (\cf7 \strokec7 Date\cf0 \strokec4 .now() - \cf8 \strokec8 172800000\cf0 \strokec4 ).toISOString(), \cf6 \strokec6 // 2 days ago\cf0 \cb1 \strokec4 \
\cb3   \},\cb1 \
\cb3   \{\cb1 \
\cb3     quest_id: \cf5 \strokec5 'quest_5'\cf0 \strokec4 ,\cb1 \
\cb3     title: \cf5 \strokec5 'Optimized database queries'\cf0 \strokec4 ,\cb1 \
\cb3     description: \cf5 \strokec5 'Added indexes and rewrote N+1 queries'\cf0 \strokec4 ,\cb1 \
\cb3     duration_min: \cf8 \strokec8 45\cf0 \strokec4 ,\cb1 \
\cb3     category: \cf5 \strokec5 'BACKEND'\cf0 \strokec4 ,\cb1 \
\cb3     created_at: \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Date\cf0 \strokec4 (\cf7 \strokec7 Date\cf0 \strokec4 .now() - \cf8 \strokec8 259200000\cf0 \strokec4 ).toISOString(), \cf6 \strokec6 // 3 days ago\cf0 \cb1 \strokec4 \
\cb3   \},\cb1 \
\cb3 ];\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  \cf7 \strokec7 MOCK_BOSSES_DATA\cf0 \strokec4 : \cf7 \strokec7 BossData\cf0 \strokec4 [] = [\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \{\cb1 \
\cb3     boss_id: \cf5 \strokec5 'boss_1'\cf0 \strokec4 ,\cb1 \
\cb3     title: \cf5 \strokec5 'E-Commerce Platform MVP'\cf0 \strokec4 ,\cb1 \
\cb3     quarter: \cf8 \strokec8 1\cf0 \strokec4 ,\cb1 \
\cb3     status: \cf5 \strokec5 'ACTIVE'\cf0 \strokec4 ,\cb1 \
\cb3     progress: \cf8 \strokec8 65\cf0 \strokec4 ,\cb1 \
\cb3     repo_url: \cf5 \strokec5 'https://github.com/username/ecommerce-mvp'\cf0 \strokec4 ,\cb1 \
\cb3     deploy_url: \cf5 \strokec5 'https://ecommerce-demo.vercel.app'\cf0 \strokec4 ,\cb1 \
\cb3     created_at: \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Date\cf0 \strokec4 (\cf5 \strokec5 '2025-01-01'\cf0 \strokec4 ).toISOString(),\cb1 \
\cb3     updated_at: \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Date\cf0 \strokec4 ().toISOString(),\cb1 \
\cb3   \},\cb1 \
\cb3   \{\cb1 \
\cb3     boss_id: \cf5 \strokec5 'boss_2'\cf0 \strokec4 ,\cb1 \
\cb3     title: \cf5 \strokec5 'Portfolio Website Redesign'\cf0 \strokec4 ,\cb1 \
\cb3     quarter: \cf8 \strokec8 4\cf0 \strokec4 ,\cb1 \
\cb3     status: \cf5 \strokec5 'COMPLETED'\cf0 \strokec4 ,\cb1 \
\cb3     progress: \cf8 \strokec8 100\cf0 \strokec4 ,\cb1 \
\cb3     repo_url: \cf5 \strokec5 'https://github.com/username/portfolio-v2'\cf0 \strokec4 ,\cb1 \
\cb3     deploy_url: \cf5 \strokec5 'https://myportfolio.com'\cf0 \strokec4 ,\cb1 \
\cb3     created_at: \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Date\cf0 \strokec4 (\cf5 \strokec5 '2024-10-01'\cf0 \strokec4 ).toISOString(),\cb1 \
\cb3     updated_at: \cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 Date\cf0 \strokec4 (\cf5 \strokec5 '2024-12-20'\cf0 \strokec4 ).toISOString(),\cb1 \
\cb3   \},\cb1 \
\cb3 ];\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // Function to seed mock data on first login\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 function\cf0 \strokec4  seedMockData() \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 const\cf0 \strokec4  hasData = localStorage.getItem(\cf7 \strokec7 STORAGE_KEYS\cf0 \strokec4 .\cf7 \strokec7 PROFILE\cf0 \strokec4 );\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (!hasData) \{\cb1 \
\cb3     localStorage.setItem(\cf7 \strokec7 STORAGE_KEYS\cf0 \strokec4 .\cf7 \strokec7 PROFILE\cf0 \strokec4 , \cf7 \strokec7 JSON\cf0 \strokec4 .stringify(\cf7 \strokec7 MOCK_PROFILE_DATA\cf0 \strokec4 ));\cb1 \
\cb3     localStorage.setItem(\cf7 \strokec7 STORAGE_KEYS\cf0 \strokec4 .\cf7 \strokec7 QUESTS\cf0 \strokec4 , \cf7 \strokec7 JSON\cf0 \strokec4 .stringify(\cf7 \strokec7 MOCK_QUESTS_DATA\cf0 \strokec4 ));\cb1 \
\cb3     localStorage.setItem(\cf7 \strokec7 STORAGE_KEYS\cf0 \strokec4 .\cf7 \strokec7 BOSSES\cf0 \strokec4 , \cf7 \strokec7 JSON\cf0 \strokec4 .stringify(\cf7 \strokec7 MOCK_BOSSES_DATA\cf0 \strokec4 ));\cb1 \
\cb3   \}\cb1 \
\cb3 \}\cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 ### 10. Middleware for Route Protection\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```typescript\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 // middleware.ts\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 import\cf0 \strokec4  \{ \cf7 \strokec7 NextResponse\cf0 \strokec4  \} \cf2 \strokec2 from\cf0 \strokec4  \cf5 \strokec5 'next/server'\cf0 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf0 \strokec4  \cf2 \strokec2 type\cf0 \strokec4  \{ \cf7 \strokec7 NextRequest\cf0 \strokec4  \} \cf2 \strokec2 from\cf0 \strokec4  \cf5 \strokec5 'next/server'\cf0 \strokec4 ;\cb1 \
\
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 function\cf0 \strokec4  middleware(request: \cf7 \strokec7 NextRequest\cf0 \strokec4 ) \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 const\cf0 \strokec4  token = request.cookies.\cf2 \strokec2 get\cf0 \strokec4 (\cf5 \strokec5 'odyssey_auth_token'\cf0 \strokec4 )?.value;\cb1 \
\cb3   \cb1 \
\cb3   \cf6 \strokec6 // Check if accessing protected route\cf0 \cb1 \strokec4 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (request.nextUrl.pathname.startsWith(\cf5 \strokec5 '/dashboard'\cf0 \strokec4 )) \{\cb1 \
\cb3     \cf2 \strokec2 if\cf0 \strokec4  (!token) \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \cf7 \strokec7 NextResponse\cf0 \strokec4 .redirect(\cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 URL\cf0 \strokec4 (\cf5 \strokec5 '/login'\cf0 \strokec4 , request.url));\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf6 \strokec6 // Validate token (basic check)\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 try\cf0 \strokec4  \{\cb1 \
\cb3       \cf2 \strokec2 const\cf0 \strokec4  payload = \cf7 \strokec7 JSON\cf0 \strokec4 .parse(atob(token));\cb1 \
\cb3       \cf2 \strokec2 const\cf0 \strokec4  isExpired = \cf7 \strokec7 Date\cf0 \strokec4 .now() > payload.exp;\cb1 \
\cb3       \cb1 \
\cb3       \cf2 \strokec2 if\cf0 \strokec4  (isExpired) \{\cb1 \
\cb3         \cf2 \strokec2 return\cf0 \strokec4  \cf7 \strokec7 NextResponse\cf0 \strokec4 .redirect(\cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 URL\cf0 \strokec4 (\cf5 \strokec5 '/login'\cf0 \strokec4 , request.url));\cb1 \
\cb3       \}\cb1 \
\cb3     \} \cf2 \strokec2 catch\cf0 \strokec4  \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \cf7 \strokec7 NextResponse\cf0 \strokec4 .redirect(\cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 URL\cf0 \strokec4 (\cf5 \strokec5 '/login'\cf0 \strokec4 , request.url));\cb1 \
\cb3     \}\cb1 \
\cb3   \}\cb1 \
\cb3   \cb1 \
\cb3   \cf6 \strokec6 // Redirect authenticated users away from login\cf0 \cb1 \strokec4 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (request.nextUrl.pathname === \cf5 \strokec5 '/login'\cf0 \strokec4  && token) \{\cb1 \
\cb3     \cf2 \strokec2 return\cf0 \strokec4  \cf7 \strokec7 NextResponse\cf0 \strokec4 .redirect(\cf2 \strokec2 new\cf0 \strokec4  \cf7 \strokec7 URL\cf0 \strokec4 (\cf5 \strokec5 '/dashboard'\cf0 \strokec4 , request.url));\cb1 \
\cb3   \}\cb1 \
\cb3   \cb1 \
\cb3   \cf2 \strokec2 return\cf0 \strokec4  \cf7 \strokec7 NextResponse\cf0 \strokec4 .next();\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  config = \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   matcher: [\cf5 \strokec5 '/dashboard/:path*'\cf0 \strokec4 , \cf5 \strokec5 '/login'\cf0 \strokec4 ],\cb1 \
\cb3 \};\cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 ```\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 ## Acceptance Criteria\cf0 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 ### Authentication\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 \uc0\u9989  Login page with email/password form  \cb1 \
\cb3 \uc0\u9989  Mock credentials work (superadmin@gmail.com / 123456)  \cb1 \
\cb3 \uc0\u9989  Invalid credentials show error message  \cb1 \
\cb3 \uc0\u9989  Successful login stores JWT token and redirects  \cb1 \
\cb3 \uc0\u9989  Token expiration handled (auto-logout after 1 hour)  \cb1 \
\cb3 \uc0\u9989  Protected routes redirect to login when not authenticated  \cb1 \
\cb3 \uc0\u9989  Logout clears all data and redirects  \cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 ### Dashboard & Data Display\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 \uc0\u9989  Profile header shows user info and level  \cb1 \
\cb3 \uc0\u9989  XP progress bar animates smoothly  \cb1 \
\cb3 \uc0\u9989  Stat cards show accurate category breakdowns  \cb1 \
\cb3 \uc0\u9989  Stat cards display with correct icons and colors  \cb1 \
\cb3 \uc0\u9989  Quest list displays recent quests chronologically  \cb1 \
\cb3 \uc0\u9989  Boss tracker shows active quarterly project  \cb1 \
\cb3 \uc0\u9989  Boss history displays completed bosses  \cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 ### CRUD Operations\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 \uc0\u9989  Create quest form validates input  \cb1 \
\cb3 \uc0\u9989  New quest appears immediately (optimistic update)  \cb1 \
\cb3 \uc0\u9989  Quest creation updates total XP and level  \cb1 \
\cb3 \uc0\u9989  Quest deletion works with confirmation  \cb1 \
\cb3 \uc0\u9989  Boss progress updates via modal  \cb1 \
\cb3 \uc0\u9989  Boss status changes reflect immediately  \cb1 \
\cb3 \uc0\u9989  All changes persist in localStorage  \cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 ### Loading & Error States\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 \uc0\u9989  Skeleton loaders show during initial fetch  \cb1 \
\cb3 \uc0\u9989  Button spinners during form submission  \cb1 \
\cb3 \uc0\u9989  Toast notifications for all actions  \cb1 \
\cb3 \uc0\u9989  Error messages display for failed operations  \cb1 \
\cb3 \uc0\u9989  Rate limiting errors handled gracefully  \cb1 \
\cb3 \uc0\u9989  Network errors show retry option  \cb1 \
\cb3 \uc0\u9989  Validation errors display inline  \cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 ### Animations & Polish\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 \uc0\u9989  Page transitions smooth and professional  \cb1 \
\cb3 \uc0\u9989  Stat cards animate on hover  \cb1 \
\cb3 \uc0\u9989  Level up triggers celebration modal  \cb1 \
\cb3 \uc0\u9989  Progress bars animate smoothly  \cb1 \
\cb3 \uc0\u9989  Quest items slide in when created  \cb1 \
\cb3 \uc0\u9989  All animations run at 60fps  \cb1 \
\cb3 \uc0\u9989  Loading skeletons have shimmer effect  \cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 ### Responsive Design\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 \uc0\u9989  Fully responsive on mobile (320px+)  \cb1 \
\cb3 \uc0\u9989  Tablet layout (640px-1024px) optimized  \cb1 \
\cb3 \uc0\u9989  Desktop layout (1024px+) uses full space  \cb1 \
\cb3 \uc0\u9989  Modals adapt to screen size  \cb1 \
\cb3 \uc0\u9989  Touch targets minimum 44px on mobile  \cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 ### Data Persistence\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 \uc0\u9989  Auth token persists across sessions  \cb1 \
\cb3 \uc0\u9989  All data stored in localStorage  \cb1 \
\cb3 \uc0\u9989  Data survives page refresh  \cb1 \
\cb3 \uc0\u9989  Logout clears all data  \cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 ### Code Quality\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 \uc0\u9989  TypeScript strict mode with no \cf9 \strokec9 `any`\cf0 \strokec4  types  \cb1 \
\cb3 \uc0\u9989  All components properly typed  \cb1 \
\cb3 \uc0\u9989  No console errors or warnings  \cb1 \
\cb3 \uc0\u9989  Consistent code style  \cb1 \
\cb3 \uc0\u9989  Reusable components extracted  \cb1 \
\cb3 \uc0\u9989  Clean separation of concerns  \cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 ### Mock API\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3 \uc0\u9989  All API calls have 500-1500ms delay  \cb1 \
\cb3 \uc0\u9989  10% random error rate implemented  \cb1 \
\cb3 \uc0\u9989  Rate limiting simulated (10 req/min)  \cb1 \
\cb3 \uc0\u9989  snake_case used in all API responses  \cb1 \
\cb3 \uc0\u9989  Optimistic updates work correctly  \cb1 \
\cb3 \uc0\u9989  Rollback on API failure  \cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 ---\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0

\f1\b \cf0 \cb3 **Build this as a complete, production-ready frontend application using Next.js 15 best practices, TypeScript strict mode, and create a premium RPG-style interface that motivates daily progress tracking. Focus on polish, smooth animations, proper error handling, and delightful user experience. The mock API should feel realistic with proper delays, errors, and rate limiting to ensure the frontend is battle-tested and ready for real API integration.**
\f0\b0 \cb1 \
}