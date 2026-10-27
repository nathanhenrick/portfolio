<template>
  <main class="container mx-auto flex justify-center items-center flex-col px-4">
    <!-- HERO -->
    <section
      id="home"
      class="home-section flex justify-center items-center flex-col min-h-screen w-full"
    >
      <div class="text-center">
        <h1 class="text-5xl sm:text-7xl lg:text-8xl uppercase font-bold">
          Nathan Henrick
        </h1>
        <p class="text-xl sm:text-2xl text-end">{{ $t("home.title") }}</p>
        <div class="flex justify-between gap-4 mt-5 text-2xl sm:text-4xl">
          <p
            :class="
              locale === 'en' ? 'text-[var(--primary)] color-subtitle' : ''
            "
          >
            {{ $t("home.subtitle1") }}
          </p>
          <p
            :class="
              locale === 'pt-br' ? 'text-[var(--primary)] color-subtitle' : ''
            "
          >
            {{ $t("home.subtitle2") }}
          </p>
        </div>
        <PrimaryButton href="#projects" @click.prevent="scrollTo('projects')">
          {{ $t("home.cta") }}
        </PrimaryButton>
      </div>
    </section>

    <!-- ABOUT -->
    <section
      id="about"
      class="section flex items-center justify-center gap-10 my-20 py-5 flex-col container min-h-screen"
    >
      <SecTitle v-reveal> .{{ $t("about.title") }} </SecTitle>

      <div
        class="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-10 container"
      >
        <NuxtImg
          v-reveal
          src="images/nathan-henrick.webp"
          :alt="$t('about.photo_alt')"
          width="400"
          height="497"
          class="select-none pointer-events-none w-full max-w-[400px] h-auto"
        />
        <div
          v-reveal="150"
          class="flex flex-col gap-5 max-w-xl justify-center text-lg sm:text-xl"
        >
          <p>
            {{ $t("about.description1_part1") }}
            <span class="text-[var(--primary)]">{{
              $t("about.description1_highlight")
            }}</span>
            {{ $t("about.description1_part2") }}
            <span class="text-[var(--primary)]">{{
              $t("about.description1_highlight2")
            }}</span
            >{{ $t("about.description1_part3") }}
          </p>
          <p>
            {{ $t("about.description2_part1") }}
            <span class="text-[var(--primary)]">{{
              $t("about.description2_highlight1")
            }}</span>
            {{ $t("about.description2_part2") }}
            <span class="text-[var(--primary)]">{{
              $t("about.description2_highlight2")
            }}</span
            >{{ $t("about.description2_part3") }}
          </p>
        </div>
      </div>
    </section>

    <!-- EXPERIENCE -->
    <section id="experience" class="section container my-20">
      <SecTitle v-reveal> .{{ $t("experience.title") }} </SecTitle>

      <article
        v-for="job in experience"
        :key="job.key"
        class="max-w-3xl mx-auto mt-12"
      >
        <header v-reveal class="mb-8">
          <h3 class="text-2xl sm:text-3xl font-semibold">
            {{ $t(`experience.${job.key}.company`) }}
          </h3>
          <p class="text-[var(--muted)] font-light">
            {{ $t(`experience.${job.key}.location`) }}
          </p>
        </header>

        <ol class="timeline">
          <li
            v-for="(role, i) in job.roles"
            :key="role"
            v-reveal="i * 100"
            class="timeline-item"
          >
            <span class="text-sm uppercase tracking-widest text-[var(--secondary)]">
              {{ $t(`experience.${job.key}.${role}.period`) }}
            </span>
            <h4 class="text-xl sm:text-2xl font-semibold mt-1">
              {{ $t(`experience.${job.key}.${role}.title`) }}
            </h4>
            <p class="text-[var(--primary)]">
              {{ $t(`experience.${job.key}.${role}.type`) }}
            </p>
            <p class="text-[var(--muted)] font-light mt-2">
              {{ $t(`experience.${job.key}.${role}.description`) }}
            </p>
            <ul class="flex flex-wrap gap-2 mt-4" :aria-label="$t('experience.skills')">
              <li
                v-for="skill in $tm(`experience.${job.key}.${role}.skills`)"
                :key="$rt(skill)"
                class="tag"
              >
                {{ $rt(skill) }}
              </li>
            </ul>
          </li>
        </ol>
      </article>
    </section>

    <!-- PROJECTS -->
    <section id="projects" class="section container my-20">
      <SecTitle v-reveal> .{{ $t("projects.title") }} </SecTitle>

      <section class="wrapper-cards flex flex-col gap-4 my-8">
        <div v-reveal class="p-4">
          <article class="container flex flex-col md:flex-row gap-10">
            <div
              class="project-cover relative self-center md:self-start"
              @click="climatizaSocialOpen = !climatizaSocialOpen"
            >
              <NuxtImg
                format="webp"
                width="320"
                height="200"
                densities="x1 x2"
                src="images/climatiza-home.png"
                :alt="$t('projects.climatiza.alt')"
              />

              <div
                class="cover-overlay absolute inset-0 flex items-center justify-center gap-6 bg-black/70"
                :class="{ open: climatizaSocialOpen }"
              >
                <a
                  v-for="social in climatizaSocials"
                  :key="social.label"
                  :href="social.href"
                  :aria-label="social.label"
                  target="_blank"
                  rel="noopener"
                  @click.stop
                >
                  <TechIcon :name="social.icon" :label="social.label" size="36" color="white" />
                </a>
              </div>
            </div>
            <div class="flex flex-col">
              <h3 class="text-3xl sm:text-4xl font-semibold">Climatiza</h3>
              <p class="text-[var(--muted)] font-light">
                {{ $t("projects.climatiza.description_part1") }}
                <a
                  class="link"
                  href="https://www.climatizaumuarama.com.br"
                  target="_blank"
                  rel="noopener"
                  >Climatiza</a
                >{{ $t("projects.climatiza.description_part2") }}
              </p>
              <ul class="list">
                <li>{{ $t("projects.climatiza.item1") }}</li>
                <li>{{ $t("projects.climatiza.item2") }}</li>
                <li>{{ $t("projects.climatiza.item3") }}</li>
                <li>{{ $t("projects.climatiza.item4") }}</li>
              </ul>
              <ul class="flex flex-wrap gap-2 mt-5" :aria-label="$t('projects.tech')">
                <li v-for="tech in climatizaStack" :key="tech.label" class="tag">
                  <Icon :name="tech.icon" size="16" />
                  {{ tech.label }}
                </li>
              </ul>
            </div>
          </article>
        </div>

        <!-- A capa abre o vídeo de apresentação num modal -->
        <div v-reveal class="p-4">
          <article class="container flex flex-col md:flex-row gap-10">
            <button
              type="button"
              class="project-cover video-cover relative self-center md:self-start"
              :aria-label="$t('projects.pizza.watch')"
              @click="openPizzaVideo"
            >
              <NuxtImg
                format="webp"
                width="320"
                height="200"
                densities="x1 x2"
                src="images/lancelot-pizzas-capa.jpg"
                :alt="$t('projects.pizza.alt')"
              />
              <span class="play-badge absolute inset-0 flex items-center justify-center">
                <Icon name="mdi:play-circle" size="64" />
              </span>
            </button>

            <dialog
              ref="pizzaDialog"
              class="video-dialog"
              :aria-label="$t('projects.pizza.watch')"
              @close="pizzaVideo?.pause()"
              @click.self="pizzaDialog?.close()"
            >
              <form method="dialog" class="flex justify-end">
                <button type="submit" class="video-close" :aria-label="$t('projects.pizza.close')">
                  <Icon name="mdi:close" size="28" />
                </button>
              </form>
              <video
                ref="pizzaVideo"
                src="/videos/lancelot-pizzas.mp4"
                poster="/images/lancelot-pizzas-capa.jpg"
                preload="none"
                controls
                playsinline
              />
            </dialog>

            <div class="flex flex-col">
              <h3 class="text-3xl sm:text-4xl font-semibold">
                {{ $t("projects.pizza.title") }}
              </h3>
              <p class="text-[var(--muted)] font-light">
                {{ $t("projects.pizza.description") }}
              </p>
              <ul class="list">
                <li>{{ $t("projects.pizza.item1") }}</li>
                <li>{{ $t("projects.pizza.item2") }}</li>
                <li>{{ $t("projects.pizza.item3") }}</li>
                <li>{{ $t("projects.pizza.item4") }}</li>
              </ul>
              <ul class="flex flex-wrap gap-2 mt-5" :aria-label="$t('projects.tech')">
                <li v-for="tech in pizzaStack" :key="tech.label" class="tag">
                  <Icon :name="tech.icon" size="16" />
                  {{ tech.label }}
                </li>
              </ul>
              <div class="flex flex-wrap gap-3 mt-6">
                <button type="button" class="project-btn project-btn--primary" @click="dockerDialog?.showModal()">
                  <Icon name="simple-icons:docker" size="18" />
                  {{ $t("projects.pizza.docker") }}
                </button>
                <a :href="PIZZA_REPO" target="_blank" rel="noopener" class="project-btn">
                  <Icon name="simple-icons:github" size="18" />
                  {{ $t("projects.pizza.github") }}
                </a>
              </div>
            </div>

            <dialog
              ref="dockerDialog"
              class="docker-dialog"
              aria-labelledby="docker-titulo"
              @click.self="dockerDialog?.close()"
            >
              <div class="flex items-start justify-between gap-4">
                <h4 id="docker-titulo" class="text-2xl font-semibold">{{ $t("projects.pizza.dockerTitle") }}</h4>
                <form method="dialog">
                  <button type="submit" class="docker-close" :aria-label="$t('projects.pizza.dockerClose')">
                    <Icon name="mdi:close" size="24" />
                  </button>
                </form>
              </div>
              <p class="text-[var(--muted)] font-light mt-3">
                {{ $t("projects.pizza.dockerIntro") }}
              </p>
              <pre class="docker-comandos"><code>{{ DOCKER_COMANDOS }}</code></pre>
              <button type="button" class="project-btn project-btn--primary" @click="copiarComandos">
                <Icon :name="copiado ? 'mdi:check' : 'mdi:content-copy'" size="18" />
                {{ copiado ? $t("projects.pizza.copied") : $t("projects.pizza.copy") }}
              </button>
              <p class="text-[var(--muted)] font-light mt-5">
                {{ $t("projects.pizza.dockerAfter") }}
                <a class="link" href="http://localhost:3000" target="_blank" rel="noopener">localhost:3000</a>.
                {{ $t("projects.pizza.dockerAdmin") }}
                <code>admin@montapizza.local</code> / <code>montapizza123</code>.
              </p>
              <p class="font-light mt-3">
                <a class="link" :href="`${PIZZA_REPO}#rodar-com-docker`" target="_blank" rel="noopener">
                  {{ $t("projects.pizza.dockerDocs") }}
                </a>
              </p>
            </dialog>
          </article>
        </div>
      </section>

      <div class="w-full flex justify-center">
        <PrimaryButton :href="profile.github" external>
          {{ $t("projects.cta") }}
        </PrimaryButton>
      </div>
    </section>

    <!-- STACK -->
    <section class="container my-20 flex flex-col items-center">
      <SecTitle v-reveal>.Stack</SecTitle>

      <!-- Front-end -->
      <article v-reveal class="lg:w-4/12 mt-10 mx-auto flex flex-col items-center">
        <Subtitle>Front-end</Subtitle>
        <div class="flex flex-wrap justify-center gap-6">
          <TechIcon name="simple-icons:html5" label="HTML5" />
          <TechIcon name="simple-icons:css3" label="CSS3" />
          <TechIcon name="simple-icons:sass" label="SCSS" />
          <TechIcon name="simple-icons:tailwindcss" label="Tailwind" />
          <TechIcon name="simple-icons:bootstrap" label="Bootstrap" />
          <TechIcon name="simple-icons:javascript" label="JavaScript" />
          <TechIcon name="simple-icons:typescript" label="TypeScript" />
          <TechIcon name="simple-icons:vuedotjs" label="Vue" />
          <TechIcon name="simple-icons:nuxtdotjs" label="Nuxt" />
          <TechIcon name="simple-icons:pinia" label="Pinia" />
          <TechIcon name="simple-icons:react" label="React" />
          <TechIcon name="simple-icons:nextdotjs" label="Next.js" />
          <TechIcon
            name="simple-icons:styledcomponents"
            label="Styled Components"
          />
          <TechIcon name="simple-icons:gsap" label="GSAP" />
          <TechIcon name="devicon-plain:vitest" label="Vitest" />
          <TechIcon name="simple-icons:playwright" label="Playwright" />
        </div>
      </article>

      <!-- Back-end -->
      <article v-reveal class="lg:w-1/2 mt-10 mx-auto flex flex-col items-center">
        <Subtitle>Back-end</Subtitle>
        <div class="flex flex-wrap justify-center gap-6">
          <TechIcon name="simple-icons:nodedotjs" label="Node.js" />
          <TechIcon name="simple-icons:php" label="PHP" />
          <TechIcon name="simple-icons:laravel" label="Laravel" />
          <TechIcon name="simple-icons:mysql" label="MySQL" />
          <TechIcon name="simple-icons:postgresql" label="PostgreSQL" />
          <TechIcon name="simple-icons:postman" label="Postman" />
        </div>
      </article>

      <!-- DevOps -->
      <article v-reveal class="lg:w-1/2 mt-10 mx-auto flex flex-col items-center">
        <Subtitle>DevOps</Subtitle>
        <div class="flex flex-wrap justify-center gap-6">
          <TechIcon name="simple-icons:git" label="Git" />
          <TechIcon name="simple-icons:github" label="GitHub" />
          <TechIcon name="simple-icons:docker" label="Docker" />
        </div>
      </article>

      <!-- Design -->
      <article v-reveal class="lg:w-1/2 mt-10 mx-auto flex flex-col items-center">
        <Subtitle>Design</Subtitle>
        <div class="flex flex-wrap justify-center gap-6">
          <TechIcon name="simple-icons:figma" label="Figma" />
          <TechIcon name="simple-icons:adobephotoshop" label="Photoshop" />
          <TechIcon name="simple-icons:inkscape" label="Inkscape" />
        </div>
      </article>
    </section>

    <!-- CONTACT -->
    <section
      id="contact"
      class="section container my-20 flex flex-col items-center text-center"
    >
      <SecTitle v-reveal> .{{ $t("contact.title") }} </SecTitle>

      <p v-reveal class="max-w-2xl text-lg sm:text-xl text-[var(--muted)] font-light mt-8">
        {{ $t("contact.description") }}
      </p>

      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mt-10">
        <li
          v-for="(item, i) in contacts"
          :key="item.label"
          v-reveal="i * 100"
          :class="{ 'sm:col-span-2': item.wide }"
        >
          <a
            :href="item.href"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noopener' : undefined"
            class="contact-card"
            :class="{ 'justify-center': item.wide }"
          >
            <Icon :name="item.icon" size="28" />
            <span class="flex flex-col text-start">
              <span class="uppercase font-semibold">{{ item.label }}</span>
              <span class="text-sm text-[var(--muted)] font-light break-all">
                {{ item.value }}
              </span>
            </span>
          </a>
        </li>
      </ul>

      <PrimaryButton v-if="profile.resume" :href="profile.resume" external>
        {{ $t("contact.resume") }}
      </PrimaryButton>
    </section>
  </main>
</template>

<script setup>
import { profile } from "~/data/profile";

const { t, locale } = useI18n();
const { scrollTo } = useScrollTo();

const climatizaSocialOpen = ref(false);
const climatizaSocials = [
  {
    label: "Instagram",
    icon: "simple-icons:instagram",
    href: "https://www.instagram.com/climatizaperola/",
  },
  {
    label: "Facebook",
    icon: "simple-icons:facebook",
    href: "https://www.facebook.com/climatizaperola",
  },
  {
    label: "WhatsApp",
    icon: "simple-icons:whatsapp",
    href: "https://api.whatsapp.com/send/?phone=44991773128&text=Ol%C3%A1%21+Vim+pelo+site+da+Climatiza+e+gostaria+de+tirar+d%C3%BAvidas.&type=phone_number&app_absent=0",
  },
];

const climatizaStack = [
  { label: "Nuxt", icon: "simple-icons:nuxtdotjs" },
  { label: "Vue", icon: "simple-icons:vuedotjs" },
  { label: "Pinia", icon: "simple-icons:pinia" },
  { label: "Bootstrap", icon: "simple-icons:bootstrap" },
  { label: "GSAP", icon: "simple-icons:gsap" },
  { label: "Laravel", icon: "simple-icons:laravel" },
  { label: "PHP", icon: "simple-icons:php" },
  { label: "Playwright", icon: "simple-icons:playwright" },
];

const pizzaStack = [
  { label: "Nuxt", icon: "simple-icons:nuxtdotjs" },
  { label: "Vue", icon: "simple-icons:vuedotjs" },
  { label: "TypeScript", icon: "simple-icons:typescript" },
  { label: "Pinia", icon: "simple-icons:pinia" },
  { label: "Three.js", icon: "simple-icons:threedotjs" },
  { label: "Laravel", icon: "simple-icons:laravel" },
  { label: "MySQL", icon: "simple-icons:mysql" },
];

const pizzaDialog = ref(null);
const pizzaVideo = ref(null);

function openPizzaVideo() {
  pizzaDialog.value.showModal();
  pizzaVideo.value.play();
}

const PIZZA_REPO = "https://github.com/nathanhenrick/lancelotPizzas";
const DOCKER_COMANDOS = [
  "git clone https://github.com/nathanhenrick/lancelotPizzas.git",
  "git clone https://github.com/nathanhenrick/backendLancelotPizzas.git",
  "cd lancelotPizzas",
  "docker compose up --build",
].join("\n");

const dockerDialog = ref(null);
const copiado = ref(false);

async function copiarComandos() {
  await navigator.clipboard.writeText(DOCKER_COMANDOS);
  copiado.value = true;
  setTimeout(() => (copiado.value = false), 2000);
}

const experience = [
  { key: "centrion", roles: ["fullstack", "intern"] },
];

// Só mostra os contatos preenchidos em ~/data/profile.ts
const contacts = computed(() =>
  [
    profile.email && {
      label: "E-mail",
      icon: "mdi:email-outline",
      href: `mailto:${profile.email}`,
      value: profile.email,
      wide: true,
    },
    profile.whatsapp && {
      label: "WhatsApp",
      icon: "simple-icons:whatsapp",
      href: `https://wa.me/${profile.whatsapp}`,
      value: t("contact.whatsapp"),
      external: true,
    },
    {
      label: "LinkedIn",
      icon: "simple-icons:linkedin",
      href: profile.linkedin,
      value: "Nathan Henrick",
      external: true,
    },
    {
      label: "GitHub",
      icon: "simple-icons:github",
      href: profile.github,
      value: profile.github.replace("https://", ""),
      external: true,
    },
  ].filter(Boolean),
);

useSeo();
</script>

<style scoped>
/* Redes sociais sobre a imagem do projeto. No celular o toque também
   ativa :hover, então o hover só vale para mouse: o primeiro toque abre
   (classe .open) e só depois os links ficam clicáveis. */
.cover-overlay {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.cover-overlay.open,
.project-cover:has(:focus-visible) .cover-overlay {
  opacity: 1;
  pointer-events: auto;
}

@media (hover: hover) and (pointer: fine) {
  .project-cover:hover .cover-overlay {
    opacity: 1;
    pointer-events: auto;
  }
}

/* Capa com vídeo: o play aparece por cima da imagem */
.video-cover {
  cursor: pointer;
  overflow: hidden;
}

.play-badge {
  color: var(--white);
  background: rgba(0, 0, 0, 0.35);
  transition: background 0.3s ease;
}

.play-badge .iconify {
  transition: transform 0.3s ease;
}

.video-cover:hover .play-badge,
.video-cover:focus-visible .play-badge {
  background: rgba(0, 0, 0, 0.55);
}

.video-cover:hover .play-badge .iconify {
  transform: scale(1.1);
}

.video-dialog {
  width: min(92vw, 1100px);
  padding: 0;
  margin: auto;
  border: none;
  background: transparent;
}

.video-dialog::backdrop {
  background: rgba(0, 0, 0, 0.85);
}

.video-dialog video {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
}

.video-close {
  padding: 0.5rem;
  color: var(--white);
}

.project-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  border: 1px solid var(--primary);
  color: var(--fg);
  text-transform: uppercase;
  font-size: 0.875rem;
  transition: background 0.3s ease, color 0.3s ease;
}

.project-btn:hover {
  background: var(--primary);
  color: var(--white);
}

.project-btn--primary {
  background: var(--primary);
  color: var(--white);
}

.project-btn--primary:hover {
  background: var(--fg);
  border-color: var(--fg);
  color: var(--bg);
}

.docker-dialog {
  width: min(92vw, 40rem);
  margin: auto;
  padding: 1.5rem;
  border: 1px solid rgba(var(--primary-rgb), 0.5);
  background: var(--bg);
  color: var(--fg);
}

.docker-dialog::backdrop {
  background: rgba(0, 0, 0, 0.75);
}

.docker-close {
  padding: 0.25rem;
  color: var(--fg);
}

.docker-comandos {
  margin: 1.25rem 0;
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.7;
  background: rgba(var(--fg-rgb), 0.06);
  border-left: 3px solid var(--primary);
}

.docker-dialog code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

/* Compensa a navbar fixa ao rolar até a seção */
.section {
  scroll-margin-top: 6rem;
}

.timeline {
  border-left: 2px solid var(--primary);
  margin-top: 0;
}

.timeline-item {
  position: relative;
  padding: 0 0 2.5rem 2rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-item::before {
  content: "";
  position: absolute;
  left: -7px;
  top: 0.35rem;
  width: 12px;
  height: 12px;
  background: var(--primary);
  box-shadow: 0 0 0 4px var(--bg);
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.6rem;
  font-size: 0.85rem;
  border: 1px solid var(--primary);
  background: rgba(var(--primary-rgb), 0.12);
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 100%;
  padding: 1rem 1.25rem;
  border: 1px solid var(--primary);
  background: rgba(var(--bg-rgb), 0.7);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    transform 0.3s ease;
}

/* Borda clara no hover: o cursor inverte as cores e o roxo ficaria verde */
.contact-card:hover {
  background: rgba(var(--fg-rgb), 0.08);
  border-color: var(--fg);
  transform: translateY(-2px);
}

/* O ícone cresce com o hover em qualquer parte do card */
.contact-card .iconify {
  flex-shrink: 0;
  opacity: 0.85;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.contact-card:hover .iconify {
  transform: scale(1.25);
  opacity: 1;
}
</style>
