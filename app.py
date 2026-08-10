import streamlit as st
import os
import time
from PIL import Image
import io

from recipes_data import (
    RECIPES_DATASET,
    INGREDIENT_SUBSTITUTIONS,
    ALLERGY_INGREDIENT_MAP,
    STRICTLY_PROHIBITED_MEATS,
    JAIN_PROHIBITED_INGREDIENTS,
    VEGAN_PROHIBITED_INGREDIENTS
)
from ai_engine import (
    generate_ai_recipe,
    detect_fridge_ingredients,
    validate_dietary_safety,
    chat_with_ai_chef
)

# ---------------------------------------------------------
# Page Configuration & Custom Light Theme Design System
# ---------------------------------------------------------
st.set_page_config(
    page_title="KitchenIQ • AI Cooking Assistant",
    page_icon="🥗",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Light Aesthetic Styling (Matching User Design Mockup)
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700&display=swap');

    html, body, [class*="css"] {
        font-family: 'Plus Jakarta Sans', 'Outfit', sans-serif;
    }
    
    .stApp {
        background-color: #F4F6F0 !important;
        color: #1E293B !important;
    }

    [data-testid="stSidebar"] {
        background-color: #F9FAF6 !important;
        border-right: 1px solid #E5E9DF !important;
    }
    
    [data-testid="stHeader"] {
        background-color: transparent !important;
    }
    
    /* Brand Logo Sidebar Header */
    .brand-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;
    }
    .brand-title {
        font-size: 1.65rem;
        font-weight: 800;
        color: #1B3626;
        letter-spacing: -0.02em;
    }
    .brand-subtitle {
        color: #64748B;
        font-size: 0.85rem;
        line-height: 1.4;
        margin-bottom: 16px;
    }
    
    /* Sidebar Profile Card */
    .profile-section {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 16px 0 12px 0;
    }
    .profile-avatar {
        width: 38px;
        height: 38px;
        background-color: #E2E8F0;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
    }
    .profile-title {
        font-size: 0.95rem;
        font-weight: 700;
        color: #1B3626;
    }
    .profile-sub {
        font-size: 0.8rem;
        color: #64748B;
    }

    /* Streak Badge */
    .streak-badge-light {
        background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
        color: #FFFFFF !important;
        padding: 8px 16px;
        border-radius: 24px;
        font-weight: 700;
        font-size: 0.88rem;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25);
        margin: 8px 0 16px 0;
    }

    /* Header Cards & Banner */
    .header-card {
        background: #FFFFFF;
        border: 1px solid #E5E9DF;
        border-radius: 18px;
        padding: 28px 32px;
        margin-bottom: 20px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
    }
    .header-title {
        font-size: 2rem;
        font-weight: 800;
        color: #1B3626;
        margin: 0 0 8px 0;
        letter-spacing: -0.02em;
    }
    .header-desc {
        color: #64748B;
        font-size: 1rem;
        margin: 0;
    }

    /* Weather Card Right */
    .weather-card-light {
        background-color: #EBF4EC;
        border-radius: 16px;
        padding: 16px 20px;
        text-align: center;
        border: 1px solid rgba(27, 122, 73, 0.12);
    }
    .weather-title {
        color: #1B5E38;
        font-weight: 700;
        font-size: 0.92rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
    }
    .weather-desc {
        color: #334155;
        font-size: 0.82rem;
        margin-top: 6px;
        line-height: 1.35;
    }

    /* Cooking Mode Active Bar */
    .active-mode-banner {
        background-color: #EBF4EC;
        border-radius: 14px;
        padding: 14px 20px;
        color: #1B5E38;
        font-weight: 800;
        font-size: 0.85rem;
        letter-spacing: 0.06em;
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
    }

    /* Step Card */
    .step-card-light {
        background: #FFFFFF;
        border-left: 5px solid #1B7A49;
        border-radius: 16px;
        padding: 26px 30px;
        margin: 20px 0;
        box-shadow: 0 4px 16px rgba(0,0,0,0.02);
    }
    .step-title {
        font-size: 1.35rem;
        font-weight: 800;
        color: #1B7A49;
        margin-bottom: 8px;
    }
    .step-text {
        font-size: 1.1rem;
        color: #334155;
        line-height: 1.6;
    }

    /* Recipe Cards */
    .recipe-card-light {
        background-color: #FFFFFF;
        border: 1px solid #E5E9DF;
        border-radius: 16px;
        padding: 20px;
        margin-bottom: 20px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
    }

    .tag-badge-light {
        background: #F1F5F9;
        color: #475569;
        padding: 4px 10px;
        border-radius: 8px;
        font-size: 0.75rem;
        font-weight: 600;
        margin-right: 6px;
        display: inline-block;
    }

    /* Metric Boxes */
    .metric-box-light {
        background: #F8FAFC;
        border-radius: 12px;
        padding: 12px;
        text-align: center;
        border: 1px solid #E2E8F0;
    }
    .metric-val-light {
        font-size: 1.35rem;
        font-weight: 800;
        color: #1B7A49;
    }
    .metric-lbl-light {
        font-size: 0.72rem;
        color: #64748B;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: 600;
    }

    /* Buttons Override */
    .stButton > button {
        border-radius: 12px !important;
        font-weight: 700 !important;
        padding: 10px 24px !important;
        border: 1px solid #CBD5E1 !important;
        background-color: #FFFFFF !important;
        color: #1E293B !important;
        box-shadow: 0 2px 6px rgba(0,0,0,0.03) !important;
    }
    .stButton > button:hover {
        background-color: #F8FAFC !important;
        border-color: #94A3B8 !important;
    }
    .stButton > button[kind="primary"] {
        background-color: #1B7A49 !important;
        color: #FFFFFF !important;
        border: none !important;
        box-shadow: 0 4px 14px rgba(27, 122, 73, 0.3) !important;
    }
    .stButton > button[kind="primary"]:hover {
        background-color: #145E37 !important;
    }

    /* Progress bar green */
    .stProgress > div > div > div > div {
        background-color: #1B7A49 !important;
    }
</style>
""", unsafe_allow_html=True)

# ---------------------------------------------------------
# Session State Setup
# ---------------------------------------------------------
if 'user_profile' not in st.session_state:
    st.session_state.user_profile = {
        "name": "Home Chef",
        "streak": 5,
        "cooked_count": 12
    }

if 'user_preferences' not in st.session_state:
    st.session_state.user_preferences = {
        "dietaryPreference": "Egg-Friendly Vegetarian",
        "allergies": [],
        "favoriteCuisines": ["Indian", "Italian"],
        "nutritionGoal": "High Protein",
        "servings": 2,
        "budget": 500
    }

if 'generated_recipe' not in st.session_state:
    st.session_state.generated_recipe = None

if 'safety_check' not in st.session_state:
    st.session_state.safety_check = None

if 'cooking_active' not in st.session_state:
    st.session_state.cooking_active = True

if 'cooking_recipe' not in st.session_state:
    st.session_state.cooking_recipe = RECIPES_DATASET[0]  # Indian Paneer Recipe default

if 'cooking_step' not in st.session_state:
    st.session_state.cooking_step = 0

if 'meal_planner' not in st.session_state:
    st.session_state.meal_planner = {
        day: {"Breakfast": None, "Lunch": None, "Dinner": None}
        for day in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    }

if 'grocery_list' not in st.session_state:
    st.session_state.grocery_list = [
        {"name": "Fresh Paneer", "category": "Dairy", "bought": False},
        {"name": "Spinach Leaves", "category": "Produce", "bought": False},
        {"name": "Garlic Cloves", "category": "Produce", "bought": True},
        {"name": "Garam Masala", "category": "Spices", "bought": False}
    ]

if 'pantry' not in st.session_state:
    st.session_state.pantry = [
        "Paneer", "Tomato", "Onion", "Butter", "Garlic", "Ginger", "Spinach", "Eggs", "Chickpeas"
    ]

if 'chat_history' not in st.session_state:
    st.session_state.chat_history = [
        {"role": "assistant", "content": "Welcome to KitchenIQ! I am your AI Cooking Assistant. Ask me anything about vegetarian recipes, nutrition, or cooking techniques!"}
    ]

# ---------------------------------------------------------
# Sidebar Configuration (Clean Light Layout Matching Design)
# ---------------------------------------------------------
with st.sidebar:
    st.markdown("""
        <div class="brand-header">
            <span style="font-size: 1.8rem;">🥗</span>
            <span class="brand-title">KitchenIQ</span>
        </div>
        <div class="brand-subtitle">
            100% Vegetarian &<br/>
            Egg-Friendly<br/>
            AI Cooking Assistant
        </div>
    """, unsafe_allow_html=True)
    
    st.markdown("<hr style='border-top: 1px solid #E2E8F0; margin: 12px 0;'/>", unsafe_allow_html=True)
    
    # Profile Summary
    st.markdown(f"""
        <div class="profile-section">
            <div class="profile-avatar">👤</div>
            <div>
                <div class="profile-title">Chef Profile</div>
                <div class="profile-sub">{st.session_state.user_profile['name']}</div>
            </div>
        </div>
        <div class="streak-badge-light">🔥 {st.session_state.user_profile['streak']} Day Cook Streak</div>
        <div style="font-weight: 600; color: #334155; font-size: 0.9rem;">Meals Prepared: {st.session_state.user_profile['cooked_count']}</div>
    """, unsafe_allow_html=True)
    
    gemini_key = os.getenv("GEMINI_API_KEY")
    
    # Dietary Preferences
    st.subheader("⚙️ Dietary Safeguards")
    dietary_pref = st.selectbox(
        "Dietary Preference",
        ["Egg-Friendly Vegetarian", "Vegan", "Jain-Friendly", "High-Protein Vegetarian", "Low-Carb", "Diabetic-Friendly", "Gluten-Free"],
        index=0
    )
    
    allergies = st.multiselect(
        "Allergies & Intolerances",
        ["Nuts", "Peanuts", "Dairy", "Eggs", "Gluten", "Soy", "Sesame"],
        default=st.session_state.user_preferences["allergies"]
    )
    
    st.session_state.user_preferences["dietaryPreference"] = dietary_pref
    st.session_state.user_preferences["allergies"] = allergies

    st.markdown("<hr style='border-top: 1px solid #E2E8F0; margin: 16px 0;'/>", unsafe_allow_html=True)
    st.caption("KitchenIQ • AI Powered Cooking Assistant")

# ---------------------------------------------------------
# Top Navigation & Weather Bar (Matching Mockup Layout)
# ---------------------------------------------------------
cols = st.columns([3.2, 1])
with cols[0]:
    st.markdown("""
        <div class="header-card">
            <h1 class="header-title">KitchenIQ • AI Cooking Assistant</h1>
            <p class="header-desc">Personalized vegetarian & egg-friendly recipes, made simple.</p>
        </div>
    """, unsafe_allow_html=True)

with cols[1]:
    st.markdown("""
        <div class="weather-card-light">
            <div class="weather-title">🌧️ Monsoon Rain</div>
            <div class="weather-desc">
                Recommended: Hot Crispy Pakoras & Masala Chai
            </div>
        </div>
    """, unsafe_allow_html=True)

# ---------------------------------------------------------
# Active Cooking Wizard Banner & Controls (Matching Mockup)
# ---------------------------------------------------------
if st.session_state.cooking_active and st.session_state.cooking_recipe:
    recipe = st.session_state.cooking_recipe
    step_idx = st.session_state.cooking_step
    total_steps = len(recipe["instructions"])
    
    # Active Banner
    st.markdown("""
        <div class="active-mode-banner">
            <span>🍲</span> COOKING MODE ACTIVE
        </div>
    """, unsafe_allow_html=True)
    
    # Cooking Title & Step Count
    st.markdown(f"<h2 style='color:#1B3626; font-weight:800; font-size:1.6rem; margin-bottom:4px;'>🧑‍🍳 Cooking: {recipe['name']}</h2>", unsafe_allow_html=True)
    st.markdown(f"<div style='color:#64748B; font-weight:600; font-size:0.95rem; margin-bottom:12px;'>Step {step_idx + 1} of {total_steps}</div>", unsafe_allow_html=True)
    
    # Progress Bar
    progress = (step_idx + 1) / total_steps
    st.progress(progress)
    
    # Step Card
    st.markdown(f"""
        <div class="step-card-light">
            <div class="step-title">Step {step_idx + 1}</div>
            <div class="step-text">{recipe['instructions'][step_idx]}</div>
        </div>
    """, unsafe_allow_html=True)
    
    # Action Buttons
    btn_cols = st.columns([1, 1, 1, 2])
    with btn_cols[0]:
        if st.button("←  Previous", disabled=(step_idx == 0)):
            st.session_state.cooking_step -= 1
            st.rerun()
    with btn_cols[1]:
        if step_idx < total_steps - 1:
            if st.button("Next Step  →", type="primary"):
                st.session_state.cooking_step += 1
                st.rerun()
        else:
            if st.button("Complete Cooking 🎉", type="primary"):
                st.balloons()
                st.session_state.user_profile["streak"] += 1
                st.session_state.user_profile["cooked_count"] += 1
                st.session_state.cooking_active = False
                st.session_state.cooking_recipe = None
                st.session_state.cooking_step = 0
                st.success("Congratulations on completing this recipe! Streak updated 🔥")
                st.rerun()
    with btn_cols[2]:
        if st.button("Cancel Mode"):
            st.session_state.cooking_active = False
            st.rerun()

    st.markdown("<hr style='border-top:1px solid #E2E8F0; margin:30px 0;'/>", unsafe_allow_html=True)

# ---------------------------------------------------------
# Main Tabs Navigation
# ---------------------------------------------------------
tab_create, tab_discover, tab_kitchen, tab_chat = st.tabs([
    "🪄 AI Recipe Studio",
    "🔍 Discover Recipes",
    "🍳 Smart Kitchen",
    "💬 AI Chef Chat"
])

# =========================================================
# TAB 1: AI RECIPE STUDIO & FRIDGE VISION
# =========================================================
with tab_create:
    st.subheader("📸 Computer Vision Fridge Scanner")
    st.caption("Upload a photo of your fridge or pantry to automatically detect fresh ingredients using Gemini Vision.")
    
    v_col1, v_col2 = st.columns([1, 2])
    with v_col1:
        uploaded_file = st.file_uploader("Upload Fridge Photo", type=["jpg", "jpeg", "png"])
        if uploaded_file:
            st.image(uploaded_file, caption="Uploaded Fridge Image", use_container_width=True)
            
            if st.button("🔍 Scan Fridge Ingredients", type="primary"):
                with st.spinner("Analyzing image with Gemini Vision AI..."):
                    img_bytes = uploaded_file.getvalue()
                    mime = uploaded_file.type
                    detection = detect_fridge_ingredients(img_bytes, mime, gemini_key)
                    
                    st.session_state.detected_ingredients = detection["safe_ingredients"]
                    st.session_state.prohibited_detected = detection["prohibited_detected"]
                    st.success(detection["raw_analysis"])
                    
    with v_col2:
        if "detected_ingredients" in st.session_state:
            st.markdown("#### 🥦 Vision Detected Ingredients:")
            safe_chips = " ".join([f"<span class='tag-badge-light'>✓ {ing}</span>" for ing in st.session_state.detected_ingredients])
            st.markdown(safe_chips, unsafe_allow_html=True)
            
            if st.session_state.prohibited_detected:
                st.warning(f"⚠️ Non-Vegetarian Items Detected & Excluded: {', '.join(st.session_state.prohibited_detected)}")

    st.markdown("<hr style='border-top:1px solid #E2E8F0; margin:24px 0;'/>", unsafe_allow_html=True)
    st.subheader("🪄 AI Recipe Generator Prompt")
    
    default_ings = st.session_state.get("detected_ingredients", ["Paneer", "Tomato", "Spinach", "Garlic"])
    
    g_col1, g_col2, g_col3 = st.columns([2, 1, 1])
    with g_col1:
        selected_ingredients = st.multiselect(
            "Select Available Ingredients",
            options=list(set(default_ings + st.session_state.pantry + ["Tofu", "Broccoli", "Chickpeas", "Eggs", "Mushrooms", "Bell Pepper", "Rice", "Noodles", "Avocado", "Cabbage"])),
            default=default_ings[:4]
        )
    with g_col2:
        cuisine = st.selectbox("Cuisine Style", ["Indian", "Italian", "Chinese", "Mediterranean", "American", "Mexican", "Fusion"])
    with g_col3:
        meal_type = st.selectbox("Meal Type", ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"])
        
    g_col4, g_col5, g_col6 = st.columns([1, 1, 1])
    with g_col4:
        cooking_time = st.selectbox("Max Cooking Time", ["15 minutes", "30 minutes", "45 minutes", "60 minutes"])
    with g_col5:
        nutrition_goal = st.selectbox("Nutrition Target", ["High Protein", "Low Calorie", "Low Carb", "Balanced", "Muscle Gain"])
    with g_col6:
        servings = st.slider("Servings", 1, 8, 2)
        
    if st.button("🪄 Generate Gourmet AI Recipe", type="primary", use_container_width=True):
        with st.spinner("KitchenIQ AI Chef crafting recipe with RAG vector context & safety checks..."):
            params = {
                "ingredients": selected_ingredients,
                "dietaryPreference": dietary_pref,
                "allergies": allergies,
                "cuisine": cuisine,
                "mealType": meal_type,
                "cookingTime": cooking_time,
                "nutritionGoal": nutrition_goal,
                "servings": servings,
                "budget": 500,
                "difficulty": "Easy"
            }
            rec, safety, rag_used = generate_ai_recipe(params, gemini_key)
            st.session_state.generated_recipe = rec
            st.session_state.safety_check = safety

    # Recipe Output Presentation
    if st.session_state.generated_recipe:
        recipe = st.session_state.generated_recipe
        safety = st.session_state.safety_check
        
        st.markdown("<hr style='border-top:1px solid #E2E8F0; margin:24px 0;'/>", unsafe_allow_html=True)
        
        if safety and safety["is_safe"]:
            st.success(f"{safety['summary']} • RAG Context Verified")
        elif safety:
            st.error(f"{safety['summary']}")

        r_col1, r_col2 = st.columns([1, 2])
        with r_col1:
            st.image(recipe.get("imageUrl", "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"), use_container_width=True)
        with r_col2:
            st.markdown(f"## {recipe['name']}")
            st.markdown(f"*{recipe['description']}*")
            
            tags_html = " ".join([f"<span class='tag-badge-light'>{tag}</span>" for tag in recipe.get('dietaryTags', [])])
            st.markdown(tags_html, unsafe_allow_html=True)
            
            m1, m2, m3, m4, m5 = st.columns(5)
            m1.markdown(f"<div class='metric-box-light'><div class='metric-val-light'>{recipe['calories']}</div><div class='metric-lbl-light'>Calories</div></div>", unsafe_allow_html=True)
            m2.markdown(f"<div class='metric-box-light'><div class='metric-val-light'>{recipe['nutrition']['protein']}g</div><div class='metric-lbl-light'>Protein</div></div>", unsafe_allow_html=True)
            m3.markdown(f"<div class='metric-box-light'><div class='metric-val-light'>{recipe['nutrition']['carbs']}g</div><div class='metric-lbl-light'>Carbs</div></div>", unsafe_allow_html=True)
            m4.markdown(f"<div class='metric-box-light'><div class='metric-val-light'>{recipe['nutrition']['fat']}g</div><div class='metric-lbl-light'>Fat</div></div>", unsafe_allow_html=True)
            m5.markdown(f"<div class='metric-box-light'><div class='metric-val-light'>{recipe['totalTime']} min</div><div class='metric-lbl-light'>Total Time</div></div>", unsafe_allow_html=True)

        st.markdown("### 🥗 Recipe Details & Execution")
        det_col1, det_col2 = st.columns([1, 1])
        
        with det_col1:
            st.markdown("#### 🛒 Ingredients Required:")
            for ing in recipe.get("ingredients", []):
                avail_icon = "✅" if ing.get("available", True) else "🛒"
                st.markdown(f"- {avail_icon} **{ing['name']}**: {ing['amount']}")
                
            if recipe.get("substitutions"):
                st.markdown("#### 🔄 Recommended Smart Substitutions:")
                sub_data = recipe["substitutions"]
                st.table(sub_data)

        with det_col2:
            st.markdown("#### 👩‍🍳 Step-by-Step Cooking Instructions:")
            for i, step in enumerate(recipe.get("instructions", []), 1):
                st.markdown(f"**{i}.** {step}")

        st.markdown("<hr style='border-top:1px solid #E2E8F0; margin:24px 0;'/>", unsafe_allow_html=True)
        st.markdown("#### ⚡ 1-Click Recipe Remixing & Actions")
        act_cols = st.columns([1, 1, 1, 1, 1.5])
        
        with act_cols[0]:
            if st.button("🌱 Remix: Vegan", use_container_width=True):
                with st.spinner("Remixing to Vegan..."):
                    params = {"ingredients": selected_ingredients, "dietaryPreference": "Vegan", "allergies": allergies, "cuisine": cuisine, "mealType": meal_type, "cookingTime": cooking_time, "nutritionGoal": nutrition_goal, "servings": servings, "budget": 500, "difficulty": "Easy"}
                    st.session_state.generated_recipe, st.session_state.safety_check, _ = generate_ai_recipe(params, gemini_key)
                    st.rerun()
                    
        with act_cols[1]:
            if st.button("🟡 Remix: Jain", use_container_width=True):
                with st.spinner("Remixing to Jain..."):
                    params = {"ingredients": selected_ingredients, "dietaryPreference": "Jain-Friendly", "allergies": allergies, "cuisine": cuisine, "mealType": meal_type, "cookingTime": cooking_time, "nutritionGoal": nutrition_goal, "servings": servings, "budget": 500, "difficulty": "Easy"}
                    st.session_state.generated_recipe, st.session_state.safety_check, _ = generate_ai_recipe(params, gemini_key)
                    st.rerun()

        with act_cols[2]:
            if st.button("⚡ Remix: 15-Min", use_container_width=True):
                with st.spinner("Remixing for 15-min speed..."):
                    params = {"ingredients": selected_ingredients, "dietaryPreference": dietary_pref, "allergies": allergies, "cuisine": cuisine, "mealType": meal_type, "cookingTime": "15 minutes", "nutritionGoal": nutrition_goal, "servings": servings, "budget": 500, "difficulty": "Easy"}
                    st.session_state.generated_recipe, st.session_state.safety_check, _ = generate_ai_recipe(params, gemini_key)
                    st.rerun()

        with act_cols[3]:
            if st.button("💪 Remix: High Protein", use_container_width=True):
                with st.spinner("Boosting protein content..."):
                    params = {"ingredients": selected_ingredients, "dietaryPreference": dietary_pref, "allergies": allergies, "cuisine": cuisine, "mealType": meal_type, "cookingTime": cooking_time, "nutritionGoal": "High Protein", "servings": servings, "budget": 500, "difficulty": "Easy"}
                    st.session_state.generated_recipe, st.session_state.safety_check, _ = generate_ai_recipe(params, gemini_key)
                    st.rerun()

        with act_cols[4]:
            if st.button("🍳 Start Guided Cooking Mode", type="primary", use_container_width=True):
                st.session_state.cooking_recipe = recipe
                st.session_state.cooking_step = 0
                st.session_state.cooking_active = True
                st.rerun()


# =========================================================
# TAB 2: DISCOVER RECIPES
# =========================================================
with tab_discover:
    st.subheader("🔍 Discover Gourmet Vegetarian & Egg-Friendly Recipes")
    
    disc_f1, disc_f2, disc_f3 = st.columns([2, 1, 1])
    with disc_f1:
        search_query = st.text_input("Search recipes or ingredients", "")
    with disc_f2:
        filter_cuisine = st.selectbox("Filter Cuisine", ["All"] + list(set([r["cuisine"] for r in RECIPES_DATASET])))
    with disc_f3:
        filter_tag = st.selectbox("Filter Dietary Tag", ["All", "Vegan", "Jain-Friendly", "Egg-Friendly Vegetarian", "High-Protein Vegetarian"])

    filtered_recipes = RECIPES_DATASET
    if search_query:
        filtered_recipes = [r for r in filtered_recipes if search_query.lower() in r["name"].lower() or search_query.lower() in r["description"].lower()]
    if filter_cuisine != "All":
        filtered_recipes = [r for r in filtered_recipes if r["cuisine"] == filter_cuisine]
    if filter_tag != "All":
        filtered_recipes = [r for r in filtered_recipes if filter_tag in r["dietaryTags"]]

    st.markdown(f"Found **{len(filtered_recipes)}** matching gourmet recipes:")

    cols_per_row = 3
    for i in range(0, len(filtered_recipes), cols_per_row):
        row_cols = st.columns(cols_per_row)
        for j in range(cols_per_row):
            if i + j < len(filtered_recipes):
                rec = filtered_recipes[i + j]
                with row_cols[j]:
                    st.markdown("<div class='recipe-card-light'>", unsafe_allow_html=True)
                    st.image(rec["imageUrl"], use_container_width=True)
                    st.markdown(f"### {rec['name']}")
                    st.caption(f"{rec['cuisine']} • {rec['mealType']} • ⏱️ {rec['totalTime']} min")
                    st.markdown(f"🔥 **{rec['calories']}** kcal | 💪 **{rec['nutrition']['protein']}g** protein")
                    
                    with st.expander("📖 View Full Recipe & Instructions"):
                        st.markdown(f"**Description:** {rec['description']}")
                        st.markdown("**Ingredients:**")
                        for ing in rec["ingredients"]:
                            st.markdown(f"- {ing['name']}: {ing['amount']}")
                        st.markdown("**Instructions:**")
                        for k, step in enumerate(rec["instructions"], 1):
                            st.markdown(f"{k}. {step}")
                            
                        if st.button(f"🍳 Cook {rec['name']}", key=f"cook_disc_{rec['id']}"):
                            st.session_state.cooking_recipe = rec
                            st.session_state.cooking_step = 0
                            st.session_state.cooking_active = True
                            st.rerun()
                    st.markdown("</div>", unsafe_allow_html=True)


# =========================================================
# TAB 3: SMART KITCHEN (MEAL PLANNER, GROCERY & PANTRY)
# =========================================================
with tab_kitchen:
    sub_plan, sub_groc, sub_pant = st.tabs(["📅 Weekly Meal Planner", "🛒 Smart Grocery List", "📦 Pantry Inventory"])
    
    with sub_plan:
        st.subheader("📅 Interactive 7-Day Meal Planner")
        st.caption("Plan your weekly vegetarian meals and monitor total daily nutrition.")
        
        days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        recipe_names = ["None"] + [r["name"] for r in RECIPES_DATASET]
        
        for day in days:
            with st.expander(f"📌 {day} Meal Plan", expanded=(day in ["Monday", "Tuesday"])):
                p_c1, p_c2, p_c3 = st.columns(3)
                with p_c1:
                    b_choice = st.selectbox(f"Breakfast ({day})", recipe_names, index=0, key=f"{day}_B")
                with p_c2:
                    l_choice = st.selectbox(f"Lunch ({day})", recipe_names, index=0, key=f"{day}_L")
                with p_c3:
                    d_choice = st.selectbox(f"Dinner ({day})", recipe_names, index=0, key=f"{day}_D")
                    
                daily_cals = 0
                daily_prot = 0
                for choice in [b_choice, l_choice, d_choice]:
                    if choice != "None":
                        r = next((x for x in RECIPES_DATASET if x["name"] == choice), None)
                        if r:
                            daily_cals += r["calories"]
                            daily_prot += r["nutrition"]["protein"]
                            
                st.markdown(f"**Daily Totals:** 🔥 **{daily_cals}** kcal | 💪 **{daily_prot}g** protein")

    with sub_groc:
        st.subheader("🛒 Smart Grocery List Manager")
        
        g_add_col1, g_add_col2 = st.columns([3, 1])
        with g_add_col1:
            new_item_name = st.text_input("Add Custom Grocery Item", "")
        with g_add_col2:
            new_item_cat = st.selectbox("Category", ["Produce", "Dairy", "Grains", "Spices", "Pantry", "Eggs"])
            if st.button("➕ Add Item"):
                if new_item_name:
                    st.session_state.grocery_list.append({"name": new_item_name, "category": new_item_cat, "bought": False})
                    st.rerun()

        st.markdown("<hr style='border-top:1px solid #E2E8F0; margin:16px 0;'/>", unsafe_allow_html=True)
        st.markdown("#### Items to Buy:")
        for idx, item in enumerate(st.session_state.grocery_list):
            ic1, ic2 = st.columns([3, 1])
            with ic1:
                checked = st.checkbox(f"**{item['name']}** ({item['category']})", value=item["bought"], key=f"groc_{idx}")
                st.session_state.grocery_list[idx]["bought"] = checked
            with ic2:
                if st.button("🗑️", key=f"del_groc_{idx}"):
                    st.session_state.grocery_list.pop(idx)
                    st.rerun()

    with sub_pant:
        st.subheader("📦 Pantry Inventory Manager")
        st.markdown("Keep track of ingredients available in your kitchen for instant recipe generation.")
        
        p_c1, p_c2 = st.columns([3, 1])
        with p_c1:
            pantry_item = st.text_input("Add to Pantry", "")
        with p_c2:
            if st.button("➕ Stock Pantry"):
                if pantry_item and pantry_item not in st.session_state.pantry:
                    st.session_state.pantry.append(pantry_item.title())
                    st.rerun()

        st.markdown("#### Currently Stocked Pantry Items:")
        pantry_chips = " ".join([f"<span class='tag-badge-light'>📦 {item}</span>" for item in st.session_state.pantry])
        st.markdown(pantry_chips, unsafe_allow_html=True)


# =========================================================
# TAB 4: AI CHEF CHAT
# =========================================================
with tab_chat:
    st.subheader("💬 Chat with KitchenIQ AI Master Chef")
    st.caption("Ask questions about vegetarian substitutions, cooking tips, wine/beverage pairings, or flavor balancing.")
    
    for msg in st.session_state.chat_history:
        with st.chat_message(msg["role"]):
            st.markdown(msg["content"])
            
    if prompt := st.chat_input("Ask Chef KitchenIQ..."):
        st.session_state.chat_history.append({"role": "user", "content": prompt})
        with st.chat_message("user"):
            st.markdown(prompt)
            
        with st.chat_message("assistant"):
            with st.spinner("Chef KitchenIQ thinking..."):
                active_rec = st.session_state.generated_recipe
                res = chat_with_ai_chef(prompt, active_rec, gemini_key)
                st.markdown(res["text"])
                if res.get("reasoning"):
                    st.caption(f"🧠 RAG Citation: {res['reasoning']}")
                st.session_state.chat_history.append({"role": "assistant", "content": res["text"]})
