---
title: "Free AI Resume Builder with Python Source Code"
date: 2025-01-01
slug: free-ai-resume-builder-with-python-source-code
summary: "I’ve lost track of the number of resumes I’ve written over the years and although resumes have changed format, and some content is no longer required (or permitted by law), the resume’s objective remains the same: secure a job interview. However, today, many resumes must pass through an ‘Applicant Tracking System’ (ATS), which many employers use"
topics:
  - tech-with-a-twist
  - ai
  - programming
status: published
original_url: "https://vault.jamesburchill.com/tech-with-a-twist/free-ai-resume-builder-with-python-source-code/"
wordpress_id: 224
featured_image: "/assets/2025/01/free-ai-resume-builder-with-python-source-code-ai-resume-builder.jpg"

---

# Free AI Resume Builder with Python Source Code

![Free AI Resume Builder with Python Source Code](/assets/2025/01/free-ai-resume-builder-with-python-source-code-ai-resume-builder.jpg)


I’ve lost track of the number of resumes I’ve written over the years and although resumes have changed format, and some content is no longer required (or permitted by law), the resume’s objective remains the same: **secure a job interview.**

However, today, many resumes must pass through an ‘Applicant Tracking System’ (ATS), which many employers use to screen and filter job applications. These systems scan resumes for keywords, formatting, and relevant information to determine whether a candidate meets the basic requirements for a role.

Because recruiters are using systems to match you to the job, it makes sense that you tailor your resume and cover letter to each application.

> **A ‘one-size-fits-all’ will not give you the best chance of success (did it ever?)**

However, writing a new customized version of your resume for each job application is quite a time commitment and can be draining and difficult for non-writers.

Which is why I decided to ‘cheat’ a little.

Let me explain.

Today, I’m a best-selling author, instructor and technologist, and I write and code almost daily.

“So what?” you rightly say.

Well, it’s this combination of skills that allowed me to answer this question:

> **“Could I automate asking ChatGPT to review a job description, and then review my resume, before (a) adjusting my resume to best match the job and (b) drafting a cover letter to go with it and then saving that all to disk.”**

The answer is yes, so I wrote the code in Python, and it does just that.

Figuring others might see some value, I’m sharing it here.

**To be clear, you must review the resulting outputs to ensure they are truthful and match your skills and experience. But even if you have to edit things a little, you get one heck of a jump-start on the resume-writing process, and frankly, I’ve been very impressed with the finished results.**

## How Does It Work?

You will need Python installed on your computer.

Then create/copy the following files somewhere safe (perhaps a folder named “Resume Builder”)

Ensure you have the various Python requirements installed (see below)

When ready, run the code **_ResumeBuilder.py_** which looks for two files in the same directory: **_job\_description.txt_** and **_resume.md_**

python ResumeBuilder.py

The program script first asks you for the name of the organization to which you’re applying. It uses the name to create a folder that sorts your various resume versions and cover letters.

It then connects to ChatGPT using an API call, so you will need an API key (which the program gets from the **_.env_** file.)

Finally, it does its magic (you can see the various ChatGPT prompts in the following code — feel free to adjust and test) before creating the folder (using the organization name given) and storing the **_cover\_letter.md_** and **_updated\_resume.md_** files.

# The Source Files

Here’s an example of what your folder might look like after you create the necessary files. The “acme” folder is a run result after giving the script the organization name, “acme” and ensuring the _job\_description.txt_ and _resume.md_ were present.

![](https://miro.medium.com/v2/resize:fit:688/1*LUHM_LEdjbSb4tS59Gly3w.png)

## .env

OpenAI\_API="XXXXXXXXXXXXXXX"  
OpenAI\_MODEL="gpt-4o"

## requirements.txt

python-dotenv~=1.0.1  
openai~=1.51.2

## job\_description.txt

Enter the job description in this file.   
I suggest simply copying and pasting from your preferred source. 

## resume.md

Put your resume in this file. Format it using markdown.  
If you are not familiar with markdown, Google it.  
Failing that, you could probably just save your resume in text.  
I suspect ChatGPT can figure it out ;) 

## ResumeBuilder.py

import os  
from dotenv import load\_dotenv  
from openai import OpenAI  
  
\# Load environment variables from .env file  
load\_dotenv()  
  
\# Initialize the OpenAI client with the API key  
client = OpenAI(api\_key=os.getenv("OpenAI\_API"))  
  
\# Read resume and job description from files  
with open("resume.md", "r") as file:  
    md\_resume = file.read()  
  
with open("job\_description.txt", "r") as file:  
    job\_description = file.read()  
  
\# Prompt user for the organization name  
organization\_name = input("Enter the name of the hiring organization: ")  
  
print("Generating updated resume and cover letter...")  
  
\# Validate organization name  
while not organization\_name or "/" in organization\_name:  
    print("Please enter a valid organization name that does not contain slashes.")  
    organization\_name = input("Enter the name of the hiring organization: ")  
  
\# Create directory for the organization  
os.makedirs(organization\_name, exist\_ok=True)  
  
\# Define the prompt for the AI model to adapt the resume  
resume\_prompt = f"""  
I have a resume formatted in Markdown and a job description. \\  
Please adapt my resume to better align with the job requirements while \\  
maintaining a professional tone. Ensure the resulting resume is Applicant Tracking Systems (ATS) friendly. \\  
Ensure ATS best-practices and naming convetions are used. \\  
Tailor my skills, experiences, and achievements to highlight the most relevant points for the position. \\  
Ensure that my resume still reflects my unique qualifications and strengths \\  
but emphasizes the skills and experiences that match the job description. \\  
Do not imagine, generate or create false information about my skills or experience.   
  
\### Here is my resume in Markdown:  
{md\_resume}  
  
\### Here is the job description:  
{job\_description}  
  
Please modify the resume to:  
\- Use keywords and phrases from the job description. Use ATS best-practices where applicable.  
\- Adjust (or add) the bullet points under each role to emphasize relevant skills and achievements.  
\- Make sure my experiences are presented in a way that matches the required qualifications.  
\- Maintain clarity, conciseness, and professionalism throughout.  
"""  
  
\# Generate updated resume and write to file  
response = client.chat.completions.create(  
    model=os.getenv("OpenAI\_MODEL"),  
    messages=\[  
        {"role": "system", "content": "You are a master 'Applicant Tracking Systems' style resume writer."},  
        {"role": "user", "content": resume\_prompt}  
    \],  
    temperature=0.25  
)  
with open(f"{organization\_name}/updated\_resume.md", "w") as file:  
    file.write(response.choices\[0\].message.content)  
  
\# Define the prompt for the AI model to generate a cover letter  
cover\_letter\_prompt = f"""  
I have a job description and some information about the company. \\  
Please write a professional cover letter that is tailored to the job and company. \\  
Highlight my relevant skills and experiences, and explain why I am a good fit for the position. \\  
Ensure the cover letter is engaging, and persuasive without being overly verbose or promotional. \\  
  
Here is the job description:  
{job\_description}  
  
Return the cover letter in Markdown format.  
"""  
  
\# Generate cover letter and write to file  
response = client.chat.completions.create(  
    model=os.getenv("OpenAI\_MODEL"),  
    messages=\[  
        {"role": "system", "content": "You are a master 'Applicant Tracking Systems' style resume cover-letter writer."},  
        {"role": "user", "content": cover\_letter\_prompt}  
    \],  
    temperature=0.25  
)  
with open(f"{organization\_name}/cover\_letter.md", "w") as file:  
    file.write(response.choices\[0\].message.content)  
  
print(f"Resume and cover letter generation complete for {organization\_name}.")

As you can see above, the “magic” of this script is in the prompts. The **_resume\_prompt_** and the **_cover\_letter\_prompt_**.

As mentioned above, feel free to adjust the prompts to alter your outputs.

Remember, it asks for the organization’s name to keep things sorted into directories for easy reference, and the script asks ChatGPT to do the rest.

It’s not quite ‘cheating,’ but one could argue that 🙂

Anyway, I hope you found this helpful.
