# 🚨 DisasterAPM – AI-Powered Multi‑Disaster Prediction & Management Platform

### *(Real‑Time Early Warning System for Floods, Cyclones, Earthquakes, Forest Fires, Heatwaves & Thunderstorms)*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deployment](https://img.shields.io/badge/deployed%20on-Vercel%20%7C%20Render-blue)](https://disasterapm-frontend.vercel.app)
[![PWA Ready](https://img.shields.io/badge/PWA-ready-purple)](#-progressive-web-app-pwa)

---

## 📌 Overview

Natural disasters claim **40,000–50,000 lives annually** worldwide, largely due to inadequate early warning systems and fragmented prediction approaches. Traditional systems focus on single hazards and rely on static data, leaving communities vulnerable to multi‑hazard scenarios exacerbated by climate change.

**DisasterAPM** is a unified, AI‑driven platform that predicts **six major disaster types** in real time:

- 🌊 **Floods**  
- 🌀 **Cyclones**  
- 🌍 **Earthquakes**  
- 🔥 **Forest Fires**  
- ☀️ **Heatwaves**  
- ⛈️ **Thunderstorms**  

The system integrates **machine learning** (Random Forest, XGBoost) and **deep learning** (LSTM) models with live data from **IMD, NOAA, USGS, MODIS, and WeatherAPI** to deliver accurate, location‑specific forecasts via an interactive web dashboard.

🔗 **Live Dashboard:** [https://disasterapm-frontend.vercel.app](https://disasterapm-frontend.vercel.app)  
🔗 **Backend API:** [https://disasterapm-backend.onrender.com](https://disasterapm-backend.onrender.com)  
🔗 **GitHub Repositories:** [Frontend](https://github.com/Saptakcodes/DisasterAPM-Frontend) | [Backend](https://github.com/Saptakcodes/DisasterAPM-Backend)

---

## 🧠 Key Innovation

> A **unified multi‑hazard prediction platform** that combines hybrid ML/DL models with live environmental APIs to provide **real‑time risk visualisation, automated alerts, and decision support** – all accessible through a Progressive Web App.

---

## 🖼️ System Architecture

![System Architecture](public/dapm-pic2.png)

**Figure 1:** End‑to‑End System Architecture of DisasterAPM.

The architecture comprises four integrated layers:

| Layer | Responsibility | Key Technologies |
|-------|---------------|------------------|
| **Data Acquisition** | Real‑time ingestion from global APIs (IMD, NOAA, USGS, MODIS, WeatherAPI) | RESTful APIs, Python `httpx` |
| **Preprocessing & Model** | Feature engineering, model inference for six hazards | Random Forest, XGBoost, LSTM (TensorFlow/PyTorch) |
| **API & Integration** | Asynchronous model serving, data aggregation | FastAPI, Uvicorn, Joblib/ONNX |
| **Visualization & Alert** | Interactive dashboard, risk maps, automated warnings | React, Leaflet, Chart.js, TailwindCSS |

---

## 🔍 Problem Statement

### ❌ Current Limitations

- **Single‑hazard focus** – separate systems for floods, cyclones, earthquakes, etc.  
- **Static, historical data** – no real‑time adaptation to changing conditions  
- **Manual parameter entry** – users must input complex environmental variables  
- **Fragmented alerts** – no unified dashboard for multi‑risk awareness  
- **Limited accessibility** – most tools are research‑oriented, not public‑facing  

### 🎯 Objectives

1. **Multi‑hazard prediction** – six disaster types in one unified platform  
2. **Real‑time data fusion** – auto‑population of parameters via live APIs  
3. **AI‑optimised models** – tailored algorithms per disaster (accuracy 84%–99.7%)  
4. **Interactive dashboard** – map‑based visualisation with colour‑coded risk levels  
5. **Automated alerts** – severity‑based warnings with actionable guidance  
6. **Progressive Web App (PWA)** – installable, offline‑capable, mobile‑friendly  
7. **Scalable backend** – FastAPI microservices ready for cloud deployment  

---

## 📚 Literature Survey

We reviewed recent advances (2020–2025) in AI‑based disaster prediction. The table below summarises key approaches and highlights DisasterAPM's integrated advantage.

![Literature Survey Comparison](public/dapm-pic1.png)

**Figure 2:** Comparative analysis of existing disaster prediction systems vs. DisasterAPM.

| Approach | Focus | Technique | Limitation | Our Improvement |
|----------|-------|-----------|------------|-----------------|
| FLOODWALL [1] | Flood only | LSTM + IoT | Single hazard | Multi‑hazard + live APIs |
| Jain et al. [4] | Global flood | LSTM + manifold learning | No real‑time UI | Interactive dashboard |
| Silva et al. [7] | Forest fire | Random Forest + MODIS | Manual data input | Auto‑fill via live location |
| Tanaka & Ito [8] | Cyclone | CNN‑LSTM | Research prototype | Production web app |
| Verma & Gupta [5] | Multi‑hazard | AI framework | No public deployment | Deployed PWA with alerts |

DisasterAPM fills the gap by providing a **single, publicly accessible platform** that predicts six hazards using **auto‑populated live data** and displays results on an **intuitive map interface**.

---

## 🔄 System Workflow (Methodology)

![Methodology Workflow](public/dapm-pic3.png)

**Figure 3:** Step‑by‑step methodology from data acquisition to user alert.

1. **Data Collection** – Real‑time ingestion from IMD, NOAA, USGS, MODIS, WeatherAPI  
2. **Data Preprocessing** – Cleaning, normalisation, feature engineering  
3. **Model Inference** – Parallel execution of hazard‑specific ML/DL models  
4. **Risk Assessment** – Severity scoring based on prediction thresholds  
5. **Visualization** – Map overlays, charts, and colour‑coded indicators on React dashboard  
6. **Alert Generation** – Automated warnings displayed on dashboard (future: email/SMS)  

---

## 📡 Real‑Time API Auto‑Filling

To eliminate manual data entry and improve accuracy, DisasterAPM automatically populates prediction parameters using the user's live location and the following global APIs:

![APIs Used for Auto-Filling](public/dapm-pic4.png)

**Figure 4:** External APIs integrated for real‑time parameter auto‑population.

| API / Source | Parameters Provided | Used For |
|--------------|---------------------|----------|
| **Open‑Meteo Flood API** | River discharge, historical flood data | Flood prediction |
| **MODIS (NASA)** | Vegetation index, land surface temperature | Forest fire, heatwave |
| **USGS Earthquake API** | Seismic activity, magnitude, depth | Earthquake prediction |
| **NOAA** | Wind speed, pressure, humidity | Cyclone, thunderstorm |
| **WeatherAPI** | Temperature, precipitation, atmospheric conditions | All weather‑related hazards |
| **IMD (India Meteorological Dept.)** | Regional weather alerts, rainfall | Flood, cyclone validation |

This automation reduces user effort and ensures predictions are based on the **latest available environmental data**.

---

## 🧠 Machine Learning & Deep Learning Models

DisasterAPM employs dedicated ML/DL models for each disaster type, selected based on data characteristics and required output.

### 📊 Model Performance Summary

![Model Accuracy Table](public/dapm-pic5.png)

**Figure 5:** Accuracy comparison of all six disaster prediction models.

| Disaster Type | Algorithm | Type | Why This Model? | Accuracy |
|---------------|-----------|------|-----------------|----------|
| **Flood** | Random Forest Classifier | Classification | Robust to tabular data, avoids overfitting | **90.17%** |
| **Cyclone** | XGBoost | Classification | Handles complex, non‑linear patterns | **84.00%** |
| **Earthquake** | LSTM | Time‑Series | Captures temporal seismic dependencies | **98.51%** |
| **Forest Fire** | Random Forest Regressor | Regression | Predicts continuous fire intensity | **97.17%** |
| **Heatwave** | Random Forest Classifier | Classification | Effective with weather tabular features | **98.34%** |
| **Thunderstorm** | Random Forest Classifier | Classification | Excels with multi‑feature weather data | **99.70%** |

*All models trained on curated historical data and cross‑validated using grid search.*

![Six Disaster Models Overview](public/dapm-pic7.png)

**Figure 6:** Overview of the six prediction models integrated into DisasterAPM.

---

## 🌊 1. Flood Prediction

### Step 1: Auto‑Fill via Open‑Meteo Flood API

![Flood API Auto-Fill](public/dapm-pic9.png)

**Figure 7:** River discharge data automatically retrieved from Open‑Meteo Flood API.

![Flood Prediction UI](public/dapm-pic8.png)

**Figure 8:** Flood prediction interface showing parameter input section.

### Step 2: AI Model Prediction

![Flood Model Prediction](public/dapm-pic10.png)

**Figure 9:** Final flood risk assessment using Random Forest Classifier (Accuracy: 90.17%).

---

## 🔥 2. Forest Fire Prediction

### Step 1: Auto‑Fill via MODIS

![Forest Fire Auto-Fill](public/dapm-pic12.png)

**Figure 10:** Vegetation index and temperature data retrieved from MODIS satellite.

![Forest Fire UI](public/dapm-pic11.png)

**Figure 11:** Forest fire prediction interface.

### Step 2: AI Model Prediction

![Forest Fire Model Prediction](public/dapm-pic13.png)

**Figure 12:** Fire intensity prediction using Random Forest Regressor (Accuracy: 97.17%).

---

## 🌍 3. Earthquake Prediction

### Step 1: Auto‑Fill via USGS Earthquake API

![Earthquake Auto-Fill](public/dapm-pic15.png)

**Figure 13:** Seismic activity data retrieved from USGS Earthquake API.

![Earthquake UI](public/dapm-pic14.png)

**Figure 14:** Earthquake prediction interface.

### Step 2: USGS Data Display

![USGS Prediction Display](public/dapm-pic16.png)

**Figure 15:** Recent earthquake events displayed from USGS feed.

### Step 3: LSTM Model Prediction (CSV Upload)

![CSV Upload](public/dapm-pic17.png)

**Figure 16:** Upload 14‑day historical seismic CSV for LSTM analysis.

![LSTM Model Prediction](public/dapm-pic18.png)

**Figure 17:** Earthquake risk prediction using LSTM network (Accuracy: 98.51%).

---

## 🌀 4. Cyclone Prediction

### Step 1: Auto‑Fill via NOAA

![Cyclone Auto-Fill](public/dapm-pic20.png)

**Figure 18:** Wind speed, pressure, and humidity retrieved from NOAA.

![Cyclone UI](public/dapm-pic19.png)

**Figure 19:** Cyclone prediction interface.

### Step 2: AI Model Prediction

![Cyclone Model Prediction](public/dapm-pic21.png)

**Figure 20:** Cyclone trajectory and intensity prediction using XGBoost (Accuracy: 84.00%).

---

## ⛈️ 5. Thunderstorm Prediction

### Step 1: Auto‑Fill via NOAA + WeatherAPI

![Thunderstorm Auto-Fill](public/dapm-pic23.png)

**Figure 21:** Atmospheric parameters retrieved from NOAA and WeatherAPI.

![Thunderstorm UI](public/dapm-pic22.png)

**Figure 22:** Thunderstorm prediction interface.

### Step 2: AI Model Prediction

![Thunderstorm Model Prediction](public/dapm-pic24.png)

**Figure 23:** Thunderstorm probability using Random Forest Classifier (Accuracy: 99.70%).

---

## ☀️ 6. Heatwave Prediction

### Step 1: Auto‑Fill via MODIS + WeatherAPI

![Heatwave Auto-Fill](public/dapm-pic26.png)

**Figure 24:** Temperature and vegetation data retrieved from MODIS and WeatherAPI.

![Heatwave UI](public/dapm-pic25.png)

**Figure 25:** Heatwave prediction interface.

### Step 2: AI Model Prediction

![Heatwave Model Prediction](public/dapm-pic27.png)

**Figure 26:** Heatwave intensity mapping using Random Forest Classifier (Accuracy: 98.34%).

---

## 🚨 Real‑Time Alerts & Disaster Updates

The platform features a dedicated **Alerts & Updates** section that aggregates:

- **Upcoming disaster alerts** with severity colour coding (green/yellow/orange/red)  
- **Latest news articles** from official meteorological sources  
- **Community‑reported incidents** (future integration)  

![Disaster Updates Section](public/dapm-pic28.png)

**Figure 27:** Disaster updates dashboard showing recent alerts and articles.

![Latest News Articles](public/dapm-pic29.png)

**Figure 28:** Curated news feed related to ongoing disasters.

![Upcoming Alerts](public/dapm-pic30.png)

**Figure 29:** Colour‑coded alert cards for impending hazards.

---

## 📈 Disaster Analysis & Historical Data

Users can explore historical trends and perform deeper analysis.

![Disaster Analysis Section](public/dapm-pic31.png)

**Figure 30:** Comprehensive disaster analysis dashboard with trends and metrics.

---

## 📱 Progressive Web App (PWA)

DisasterAPM is deployed as a **fully installable Progressive Web App**, ensuring reliable access even in areas with unstable internet – critical during disasters.

![PWA Installation](public/dapm-pic6.png)

**Figure 31:** DisasterAPM installed as a PWA on a mobile device.

**PWA Features:**
- ✅ Offline access to cached predictions and guides  
- ✅ Add to Home Screen (Android/iOS)  
- ✅ Push notification readiness (future)  
- ✅ Fast loading and responsive design  

---

## 🛠️ Technology Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18, Vite, TailwindCSS, Leaflet.js, Chart.js, React Router |
| **Backend** | FastAPI (Python 3.10), Uvicorn, Joblib, ONNX Runtime |
| **Machine Learning** | Scikit‑learn (Random Forest, XGBoost), TensorFlow/PyTorch (LSTM) |
| **Database** | MongoDB Atlas (user preferences, alert logs) |
| **APIs & Data** | Open‑Meteo Flood API, MODIS, USGS, NOAA, WeatherAPI, IMD |
| **Deployment** | Vercel (Frontend), Render (Backend), GitHub Actions (CI/CD) |
| **PWA** | Workbox, Service Workers, Manifest.json |

---

## 🧪 Experimental Results & Discussion

### 📊 Model Performance Summary

| Disaster | Model | Accuracy | Precision | Recall | F1‑Score |
|----------|-------|----------|-----------|--------|----------|
| Flood | Random Forest | 90.17% | 0.89 | 0.91 | 0.90 |
| Cyclone | XGBoost | 84.00% | 0.82 | 0.86 | 0.84 |
| Earthquake | LSTM | 98.51% | 0.98 | 0.99 | 0.98 |
| Forest Fire | Random Forest | 97.17% | 0.96 | 0.98 | 0.97 |
| Heatwave | Random Forest | 98.34% | 0.98 | 0.98 | 0.98 |
| Thunderstorm | Random Forest | 99.70% | 0.99 | 0.99 | 0.99 |

### 🚀 System Responsiveness

- **Auto‑fill latency:** < 2 seconds for API data retrieval  
- **Model inference:** < 500 ms per prediction (FastAPI async)  
- **Dashboard update:** Real‑time upon prediction completion  

---

## 🚀 Future Scope

DisasterAPM is designed for continuous enhancement. Planned features include:

1. **Email & SMS Alerts** – Instant notifications to registered users  
2. **IoT Sensor Integration** – Ground‑level weather stations for hyperlocal accuracy  
3. **Reinforcement Learning** – Adaptive thresholds based on evolving climate patterns  
4. **Mobile Native Apps** – iOS/Android applications for broader reach  
5. **Multilingual Support** – Regional languages for inclusive disaster communication  
6. **Crowdsourced Reporting** – User‑submitted incident verification  
7. **AI Chat Assistant** – LLM‑powered emergency guidance  

---

## 🏁 Conclusion

DisasterAPM successfully delivers a **production‑ready, AI‑powered multi‑hazard prediction platform** that:

- Predicts **six major disaster types** with accuracies ranging from **84% to 99.7%**  
- Automates parameter entry using **live global APIs** (IMD, NOAA, USGS, MODIS, WeatherAPI)  
- Provides an **interactive, map‑based dashboard** with real‑time risk visualisation  
- Functions as a **Progressive Web App** for reliable access in any network condition  

The platform empowers citizens, government agencies, and NGOs with **timely, actionable intelligence** to mitigate disaster impact and save lives.

---

## 📁 Research Work & Presentation

For a detailed walkthrough of the methodology, model training, and system architecture, refer to:

📄 **Research Paper (PDF):**  
[DisasterAPM – AI Powered Multi‑Disaster Prediction Platform](https://drive.google.com/file/d/1lyag6m9skkIwzL9ACeJ9s7xTeqFisx9m/view?usp=sharing)

📽️ **Project Presentation (PPT):**  
[https://docs.google.com/presentation/d/1Tpv_iWbCsoY7ur-hs_ohDJELM6s1i86K](https://docs.google.com/presentation/d/1Tpv_iWbCsoY7ur-hs_ohDJELM6s1i86K)

---

## 👨‍💻 Authors

- **Soumyadeep Biswas**  
- **Saptak Chaki**  
- **Soham Mondal**  
- **Saptarshi Roy**  
- **Sayan Jana**  

Under the guidance of **Prof. Kishan Singh**

---

## 🏫 Institution

**Institute of Engineering & Management, Kolkata**  
**University of Engineering and Management, Kolkata**  
Department of Computer Science & Engineering (AI & ML)

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## ⭐ Support

If you find DisasterAPM valuable, please:

- ⭐ **Star** the repository  
- 🤝 **Fork** and contribute  
- 🌍 **Share** with disaster management communities  

---
