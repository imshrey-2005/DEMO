import os

import google.generativeai as genai
from dotenv import load_dotenv
from groq import Groq

from backend.prompts import (INSPIRATION_POEM_PROMPT,
                             USER_POST_TEXT_DECOMPOSITION_PROMPT,
                             USER_POST_TEXT_EXPANSION_PROMPT)

load_dotenv()


async def expand_user_text_using_gemini(user_input):
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(
        f"{USER_POST_TEXT_EXPANSION_PROMPT}. The data is {user_input}"
    )
    print(response.text)
    return response.text


async def expand_user_text_using_gemma(user_input):
    client = Groq(api_key=os.getenv("GROQ_API_TOKEN"))

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"{USER_POST_TEXT_EXPANSION_PROMPT}. The data is {user_input}",
            }
        ],
        model="gemma2-9b-it",
    )

    return chat_completion.choices[0].message.content

# def text_to_image(user_input):
#     genai.configure() # No need to set api key when GOOGLE_APPLICATION_CREDENTIALS is set.
#     models = genai.list_models()
#     for model in models:
#         print(
#             f"Model Name: {model.name}, Supported Methods: {model.supported_generation_methods}"
#         )

#     imagen = genai.GenerativeModel("gemini-pro-vision") # or whatever vision model you want to use.
#     try:
#         result = imagen.generate_content(user_input)
#         print(result.text) # or result.parts if you are expecting image data.
#     except Exception as e:
#         print(f"Error generating image: {e}")

def text_to_image(user_input):
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    models = genai.list_models()
    for model in models:
        print(
            f"Model Name: {model.name}, Supported Methods: {model.supported_generation_methods}"
        )

    # imagen = genai.ImageGenerationModel("imagen-3.0-generate-001")
    # result = imagen.generate_images(prompt="Fuzzy bunnies in my kitchen", number_of_images=4)
    # for image in result.images:
    #     print(image)

    # for image in result.images:
    # # Open and display the image using your local operating system.
    #     image._pil_image.show()

# def text_to_image(user_input):
#     genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
#     # List models and find one that supports image generation
#     models = genai.list_models()
#     image_model = None
#     for model in models:
#         if "generate_image" in model.supported_generation_methods:
#             image_model = model.name  # Select first available image generation model
#             break
#     print(f"Selected image generation model: {image_model}")

#     if not image_model:
#         print("No model found that supports image generation.")
#         return None

#     # Generate an image
#     response = genai.generate_image(model=image_model, prompt=user_input)

#     # Save or return the image
#     image_path = "generated_image.png"
#     with open(image_path, "wb") as f:
#         f.write(response.image)

#     print(f"Image saved at {image_path}")
#     return image_path

def decompose_user_text(user_input):
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    print("before decompose: ", user_input)
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(
        f"{USER_POST_TEXT_DECOMPOSITION_PROMPT}. The data is {user_input}"
    )
    print("after decompose: ", response.text)
    return response.text


def create_poem(user_input):
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

    model = genai.GenerativeModel("gemini-1.5-flash-8b")
    response = model.generate_content(
        f"{INSPIRATION_POEM_PROMPT}. The data is {user_input}"
    )
    print(response.text)
    return response.text
