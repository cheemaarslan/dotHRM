import re
import os

file_path = r'e:\bitlogicx\hrms\dotHRM\resources\js\pages\settings\profile-settings.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the useEffect for smart scroll functionality
# It's bounded by "// Smart scroll functionality" and "}, []);"
scroll_effect_pattern = r'// Smart scroll functionality.*?}, \[\]\);'
content = re.sub(scroll_effect_pattern, '', content, flags=re.DOTALL)

# 2. Update handleNavClick to remove scrollIntoView
nav_click_old = """  // Handle navigation click
  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };"""

nav_click_new = """  // Handle navigation click
  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    setActiveSection(id);
  };"""

content = content.replace(nav_click_old, nav_click_new)

# 3. Add conditional rendering for the Profile section
profile_section_old = """          {/* Profile Section */}
          <section id="profile" ref={profileRef} className="mb-16">"""
profile_section_new = """          {/* Profile Section */}
          {activeSection === 'profile' && (
          <section id="profile" ref={profileRef} className="mb-16">"""
content = content.replace(profile_section_old, profile_section_new)

profile_section_end_old = """                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {/* Password Section */}"""

profile_section_end_new = """                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>
          )}

          {/* Password Section */}"""
content = content.replace(profile_section_end_old, profile_section_end_new)

# 4. Add conditional rendering for the Password section
password_section_old = """          {/* Password Section */}
          <section id="password" ref={passwordRef} className="mb-16">"""
password_section_new = """          {/* Password Section */}
          {activeSection === 'password' && (
          <section id="password" ref={passwordRef} className="mb-16">"""
content = content.replace(password_section_old, password_section_new)

password_section_end_old = """                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>"""

password_section_end_new = """                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>
          )}
        </div>"""
content = content.replace(password_section_end_old, password_section_end_new)


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Profile settings successfully updated to use tabs!")
