const skills = [
  { name: "HTML", percentage: 95 },
  { name: "CSS", percentage: 90 },
  { name: "JavaScript", percentage: 85 },
  { name: "Photoshop", percentage: 80 },
  { name: "NodeJS", percentage: 75 },
  { name: "React", percentage: 80 }
];

const container = document.getElementById('skills-container');

skills.forEach(skill => {
  const skillDiv = document.createElement('div');
  skillDiv.className = 'skill';

  const label = document.createElement('div');
  label.className = 'skill-label';
  label.textContent = skill.name;

  const bar = document.createElement('div');
  bar.className = 'skill-bar';

  const fill = document.createElement('div');
  fill.className = 'skill-fill';
  fill.textContent = `${skill.percentage}%`;
  fill.style.width = '0';

  bar.appendChild(fill);
  skillDiv.appendChild(label);
  skillDiv.appendChild(bar);
  container.appendChild(skillDiv);

  setTimeout(() => {
    fill.style.width = skill.percentage + '%';
  }, 100);
});




// Animate skill bars on page load
document.addEventListener("DOMContentLoaded", function() {
  const skillFills = document.querySelectorAll('.skill-fill');
  skillFills.forEach(fill => {
    const percentage = fill.getAttribute('data-percentage');
    setTimeout(() => {
      fill.style.width = percentage + '%';
    }, 300);
  });
});