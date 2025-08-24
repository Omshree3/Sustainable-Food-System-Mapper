from fpdf import FPDf

pdf = FPDF()
pdf.set_auto_page_break(auto=True, margin=15)

# Title page
pdf.add_page()
pdf.set_font("Arial", "B", 24)
pdf.cell(0, 20, "Sustainable Food System Mapper", ln=True, align="C")
pdf.set_font("Arial", "", 16)
pdf.cell(0, 10, "By Omshree Chinni", ln=True, align="C")
pdf.ln(10)
pdf.multi_cell(0, 8, "Connecting surplus food with those in need, reducing waste and hunger.", align="C")

# Add section
def add_section(title, text):
    pdf.add_page()
    pdf.set_font("Arial", "B", 18)
    pdf.cell(0, 10, title, ln=True)
    pdf.ln(5)
    pdf.set_font("Arial", "", 12)
    pdf.multi_cell(0, 7, text)

# Sections
add_section("Why I did this project", "I was always bothered by how much food goes to waste while so many people struggle with hunger...")
add_section("Problems", "Surplus food from restaurants, stores, and homes often doesn’t reach those who need it...")
add_section("Solution", "The Sustainable Food System Mapper connects food donors with recipients, shows an interactive map, finds the nearest matches, and tracks impact metrics...")
add_section("How I built it", "Used Flask for backend, HTML/CSS/JS for frontend, Leaflet.js + OpenStreetMap for maps, matching algorithms, impact calculations...")
add_section("Challenges", "Ensuring real-life matching, designing simple interfaces, calculating impact accurately...")
add_section("Accomplishments", "Working platform with donor-recipient matches, map, and impact metrics.")
add_section("Skills I used", "Python, Flask, HTML, CSS, JavaScript, Leaflet.js, OpenStreetMap, problem-solving, UI/UX design")
add_section("What I learned", "Combining technology with social impact, designing practical and ethical solutions...")

# Add work proof images
image_paths = ["photo1.jpg", "photo2.jpg", "photo3.jpg"]  # Replace with your uploaded images
for img in image_paths:
    pdf.add_page()
    pdf.image(img, x=10, y=20, w=180)  # Adjust width/position

# Save PDF
pdf.output("Sustainable_Food_System_Mapper.pdf")
