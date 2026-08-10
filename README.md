# 🥗 KitchenIQ • AI Cooking & Gourmet Assistant

> **A smart 100% vegetarian & egg-friendly AI culinary platform powered by Gemini Vision, RAG Vector Search, and Streamlit.**

---

## ✨ Key Features

- 🥦 **100% Vegetarian & Egg-Friendly Safeguards**: Automated safety validation strictly excluding meat, poultry, and seafood while adhering to Vegan, Jain-Friendly, and custom allergy requirements.
- 📸 **Computer Vision Fridge Scanner**: Upload fridge/pantry photos to automatically detect ingredients using Gemini Vision AI.
- 🪄 **Smart AI Recipe Generator**: Generate tailored gourmet recipes based on available ingredients, cuisine style, meal type, cooking time, and nutrition goals.
- ⚡ **1-Click Recipe Remixing**: Instantly transform any recipe into **Vegan**, **Jain-Friendly**, **15-Minute**, or **High-Protein** variations.
- 👨‍🍳 **Interactive Guided Cooking Mode**: Step-by-step cooking progress bar, timer, instructions, streak counter, and completion celebrations.
- 📅 **Smart Kitchen Suite**:
  - **7-Day Meal Planner**: Interactive weekly meal scheduler tracking daily calories and protein totals.
  - **Smart Grocery List**: Aggregates missing ingredients grouped by category (Produce, Dairy, Grains, Spices, Pantry, Eggs).
  - **Pantry Manager**: Stock tracking for kitchen inventory.
- 💬 **AI Master Chef Chat**: Conversational AI chef assistant with RAG knowledge retrieval for substitution tips, flavor balancing, and techniques.

---

## 🛠️ Tech Stack & Architecture

- **Frontend & UI**: Streamlit with custom CSS (Soft Sage & Light Aesthetic Design)
- **AI Models**: Google Gemini 3.6 Flash / Gemini 2.5 Flash (`google-genai` SDK)
- **Computer Vision**: Gemini Vision API for ingredient detection
- **Knowledge Base & RAG**: Vector Context Retrieval over curated vegetarian recipe datasets
- **Language**: Python 3.9+

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Python**: Version 3.9 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/Manaswi171/Recipe-Generator.git
cd Recipe-Generator
```

### 2. Install Required Dependencies
```bash
pip install streamlit google-genai pillow
```

### 3. Set API Key (Optional)
Set your Gemini API Key to activate live AI generation. If no key is set, KitchenIQ operates using its built-in smart engine.

```bash
# On Linux / macOS / Git Bash
export GEMINI_API_KEY="your_gemini_api_key"

# On Windows PowerShell
$env:GEMINI_API_KEY="your_gemini_api_key"
```

### 4. Launch the Streamlit App
```bash
streamlit run app.py
```

Open your browser at `http://localhost:8501`.

---

## 📂 Project Structure

```
├── app.py              # Main Streamlit web application & UI layout
├── ai_engine.py         # Gemini API client, Vision scanner, RAG search & chat engine
├── recipes_data.py      # Gourmet recipe dataset, dietary rules, and substitution maps
├── README.md            # Project documentation
└── .gitignore           # Git ignore rules
```

---

## 🛡️ License

This project is licensed under the MIT License.
