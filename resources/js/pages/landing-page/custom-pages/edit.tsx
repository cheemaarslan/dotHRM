import React, { useState, useRef } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  LayoutTemplate,
  FileText,
  Layers,
  Image,
  Star,
  Info,
  Users,
  MessageCircle,
  DollarSign,
  HelpCircle,
  Mail,
  Phone,
  Plus,
  Trash2,
  GripVertical,
  Eye,
  EyeOff,
  Puzzle,
  Navigation2,
} from 'lucide-react';
import { PageTemplate } from '@/components/page-template';
import { toast } from '@/components/custom-toast';
import { useTranslation } from 'react-i18next';
import { Toaster } from '@/components/ui/toaster';

interface CustomPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
  sort_order: number;
  sections?: string[];
  show_breadcrumb?: boolean;
}

interface PageProps {
  page: CustomPage;
  globalSettings?: any;
  settings?: any;
}

// ─── Component Registry ──────────────────────────────────────────────────────
interface ComponentDef {
  key: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
}

const COMPONENT_REGISTRY: ComponentDef[] = [
  {
    key: 'content',
    label: 'Custom Content',
    description: 'Rich-text content block written in the Content tab above.',
    icon: FileText,
    color: 'text-gray-700',
    bg: 'bg-gray-50 border-gray-200',
  },
  {
    key: 'hero',
    label: 'Hero Section',
    description: 'Bold hero banner with headline, sub-text and call-to-action buttons.',
    icon: LayoutTemplate,
    color: 'text-blue-600',
    bg: 'bg-blue-50 border-blue-100',
  },
  {
    key: 'features',
    label: 'Features',
    description: 'Grid of feature cards highlighting product capabilities.',
    icon: Layers,
    color: 'text-purple-600',
    bg: 'bg-purple-50 border-purple-100',
  },
  {
    key: 'screenshots',
    label: 'Screenshots',
    description: 'Carousel / gallery of app screenshots.',
    icon: Image,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50 border-cyan-100',
  },
  {
    key: 'why_choose_us',
    label: 'Why Choose Us',
    description: 'Key differentiators displayed as icon + text tiles.',
    icon: Star,
    color: 'text-amber-600',
    bg: 'bg-amber-50 border-amber-100',
  },
  {
    key: 'about',
    label: 'About Us',
    description: 'Company story, mission and values section.',
    icon: Info,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 border-emerald-100',
  },
  {
    key: 'team',
    label: 'Team',
    description: 'Team member cards with photo, name and role.',
    icon: Users,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50 border-indigo-100',
  },
  {
    key: 'testimonials',
    label: 'Testimonials',
    description: 'Customer reviews with star ratings and quotes.',
    icon: MessageCircle,
    color: 'text-rose-600',
    bg: 'bg-rose-50 border-rose-100',
  },
  {
    key: 'plans',
    label: 'Pricing Plans',
    description: 'Subscription tiers with feature lists and CTA buttons.',
    icon: DollarSign,
    color: 'text-green-600',
    bg: 'bg-green-50 border-green-100',
  },
  {
    key: 'faq',
    label: 'FAQ',
    description: 'Accordion of frequently asked questions and answers.',
    icon: HelpCircle,
    color: 'text-orange-600',
    bg: 'bg-orange-50 border-orange-100',
  },
  {
    key: 'newsletter',
    label: 'Newsletter',
    description: 'Email subscription form with brief pitch text.',
    icon: Mail,
    color: 'text-pink-600',
    bg: 'bg-pink-50 border-pink-100',
  },
  {
    key: 'contact',
    label: 'Contact',
    description: 'Contact form with map / address details.',
    icon: Phone,
    color: 'text-teal-600',
    bg: 'bg-teal-50 border-teal-100',
  },
];

const getComponentDef = (key: string): ComponentDef | undefined =>
  COMPONENT_REGISTRY.find((c) => c.key === key);

// ─── Drag-and-drop helpers ────────────────────────────────────────────────────
function reorder<T>(list: T[], from: number, to: number): T[] {
  const result = [...list];
  const [removed] = result.splice(from, 1);
  result.splice(to, 0, removed);
  return result;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function EditCustomPage() {
  const { t } = useTranslation();
  const { page, globalSettings } = usePage<PageProps>().props;

  const [activeTab, setActiveTab] = useState<'sections' | 'content'>('sections');
  const [formData, setFormData] = useState({
    title: page.title,
    content: page.content || '',
    meta_title: page.meta_title || '',
    meta_description: page.meta_description || '',
    is_active: page.is_active,
    sort_order: page.sort_order || 0,
    sections: (page.sections || []) as string[],
    show_breadcrumb: page.show_breadcrumb ?? false,
  });

  // Drag state
  const dragIndex = useRef<number | null>(null);
  const dragOverIndex = useRef<number | null>(null);

  // ── Section management ──────────────────────────────────────────────────────
  const addSection = (key: string) => {
    setFormData((prev) => ({ ...prev, sections: [...prev.sections, key] }));
  };

  const removeSection = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== idx),
    }));
  };

  // ── Drag handlers ───────────────────────────────────────────────────────────
  const onDragStart = (idx: number) => { dragIndex.current = idx; };
  const onDragEnter = (idx: number) => { dragOverIndex.current = idx; };
  const onDragEnd = () => {
    if (dragIndex.current !== null && dragOverIndex.current !== null && dragIndex.current !== dragOverIndex.current) {
      setFormData((prev) => ({
        ...prev,
        sections: reorder(prev.sections, dragIndex.current!, dragOverIndex.current!),
      }));
    }
    dragIndex.current = null;
    dragOverIndex.current = null;
  };

  // ── Form submission ─────────────────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!globalSettings?.is_demo) toast.loading(t('Updating page...'));

    router.put(route('landing-page.custom-pages.update', page.id), formData, {
      onSuccess: (p) => {
        if (!globalSettings?.is_demo) toast.dismiss();
        if (p.props.flash?.success) toast.success(t(p.props.flash.success));
        else if (p.props.flash?.error) toast.error(t(p.props.flash.error));
      },
      onError: (errors) => {
        if (!globalSettings?.is_demo) toast.dismiss();
        if (typeof errors === 'object' && errors !== null) {
          Object.values(errors).flat().forEach((err) => toast.error(t(err as string)));
        } else {
          toast.error(t('Failed to update page'));
        }
      },
    });
  };

  const handleCancel = () => router.get(route('landing-page.custom-pages.index'));

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <PageTemplate
      title={t('Edit Custom Page')}
      url={`/custom-pages/${page.id}/edit`}
      breadcrumbs={[
        { title: t('Dashboard'), href: route('dashboard') },
        { title: t('Landing Page') },
        { title: t('Custom Pages'), href: route('landing-page.custom-pages.index') },
        { title: t('Edit') },
      ]}
      actions={[
        {
          label: t('Back'),
          icon: <ArrowLeft className="h-4 w-4 mr-2" />,
          variant: 'outline',
          onClick: () => router.get(route('landing-page.custom-pages.index')),
        },
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── Page Title & Slug ──────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('Page Information')}</CardTitle>
            <CardDescription>{t('Update your custom page content and settings')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                {t('Page Title')} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={t('e.g., About Us, Privacy Policy')}
                required
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                {t('Current slug')}: <span className="font-mono">/page/{page.slug}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ── Tabs: Content / Sections ───────────────────────────────────── */}
        <Card>
          <CardHeader className="pb-0">
            {/* Tab bar */}
            <div className="flex border-b -mx-6 px-6">
              <button
                type="button"
                onClick={() => setActiveTab('sections')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'sections'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Puzzle className="h-4 w-4" />
                {t('Sections')}
                {formData.sections.length > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {formData.sections.length}
                  </Badge>
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'content'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <FileText className="h-4 w-4" />
                {t('Content')}
              </button>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {/* ── Content Tab ──────────────────────────────────────────────── */}
            {activeTab === 'content' && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  {t('Rich-text content that appears at the top of the page (before any sections).')}
                </p>
                <div className="min-h-[300px]">
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                    placeholder={t('Write your page content here...')}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {t('Use the editor toolbar to format your content with headings, lists, links, and more')}
                </p>
              </div>
            )}

            {/* ── Sections Tab ─────────────────────────────────────────────── */}
            {activeTab === 'sections' && (
              <div className="space-y-6">
                {/* Info banner */}
                <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700 flex items-start gap-2">
                  <Puzzle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>
                    {t('Build your page by adding components below. Add "Custom Content" to control exactly where your rich-text block appears. Drag rows to reorder. Sections without "Custom Content" will not show the Content tab text.')}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* ── Left: Component Picker ─────────────────────────────── */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      {t('Available Components')}
                    </h3>
                    <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
                      {COMPONENT_REGISTRY.map((comp) => {
                        const Icon = comp.icon;
                        return (
                          <div
                            key={comp.key}
                            className={`flex items-center gap-3 p-3 rounded-lg border ${comp.bg} transition-all hover:shadow-sm`}
                          >
                            <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-white/80 border ${comp.bg}`}>
                              <Icon className={`h-4 w-4 ${comp.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-800 leading-none mb-0.5">
                                {t(comp.label)}
                              </p>
                              <p className="text-xs text-gray-500 truncate">{t(comp.description)}</p>
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="shrink-0 h-7 px-2 text-xs gap-1 hover:bg-white"
                              onClick={() => addSection(comp.key)}
                            >
                              <Plus className="h-3 w-3" />
                              {t('Add')}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ── Right: Added Sections (Ordered) ───────────────────── */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <LayoutTemplate className="h-4 w-4" />
                      {t('Page Sections')}
                      {formData.sections.length > 0 && (
                        <span className="text-xs text-muted-foreground font-normal ml-1">
                          — {t('drag to reorder')}
                        </span>
                      )}
                    </h3>

                    {formData.sections.length === 0 ? (
                      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-12 text-center">
                        <Puzzle className="h-8 w-8 text-gray-300 mb-3" />
                        <p className="text-sm font-medium text-gray-400">
                          {t('No sections added yet')}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {t('Click "Add" on any component to the left')}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
                        {formData.sections.map((key, idx) => {
                          const def = getComponentDef(key);
                          const Icon = def?.icon ?? Puzzle;
                          return (
                            <div
                              key={`${key}-${idx}`}
                              draggable
                              onDragStart={() => onDragStart(idx)}
                              onDragEnter={() => onDragEnter(idx)}
                              onDragEnd={onDragEnd}
                              onDragOver={(e) => e.preventDefault()}
                              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm cursor-grab active:cursor-grabbing hover:border-gray-300 transition-all select-none"
                            >
                              {/* Drag handle */}
                              <GripVertical className="h-4 w-4 text-gray-300 shrink-0" />

                              {/* Icon */}
                              <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${def?.bg ?? 'bg-gray-50 border-gray-100'} border`}>
                                <Icon className={`h-4 w-4 ${def?.color ?? 'text-gray-400'}`} />
                              </div>

                              {/* Label */}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-800 leading-none">
                                  {def ? t(def.label) : key}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {t('Position')} {idx + 1}
                                </p>
                              </div>

                              {/* Remove */}
                              <button
                                type="button"
                                onClick={() => removeSection(idx)}
                                className="shrink-0 h-7 w-7 flex items-center justify-center rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                title={t('Remove')}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── SEO Settings ──────────────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">{t('SEO Settings')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="meta_title" className="text-sm font-medium">
                  {t('Meta Title')}
                </Label>
                <Input
                  id="meta_title"
                  value={formData.meta_title}
                  onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                  placeholder={t('SEO optimized title')}
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground">
                  {t('Recommended: 50-60 characters')} ({formData.meta_title.length}/60)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sort_order" className="text-sm font-medium">
                  {t('Sort Order')}
                </Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) =>
                    setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })
                  }
                  placeholder="0"
                  min="0"
                />
                <p className="text-xs text-muted-foreground">
                  {t('Lower numbers appear first in navigation')}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_description" className="text-sm font-medium">
                {t('Meta Description')}
              </Label>
              <Textarea
                id="meta_description"
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                placeholder={t('Brief description for search engines')}
                rows={3}
                maxLength={160}
              />
              <p className="text-xs text-muted-foreground">
                {t('Recommended: 150-160 characters')} ({formData.meta_description.length}/160)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ── Publish Settings ──────────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">{t('Publish Settings')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Publish toggle */}
            <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <div className="flex-1">
                <Label htmlFor="is_active" className="text-sm font-medium cursor-pointer flex items-center gap-2">
                  {formData.is_active ? (
                    <Eye className="h-4 w-4 text-green-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  )}
                  {t('Publish Page')}
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.is_active
                    ? t('This page will be visible to the public immediately')
                    : t('This page will be saved as a draft and hidden from public view')}
                </p>
              </div>
            </div>

            {/* Breadcrumb toggle */}
            <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
              <Switch
                id="show_breadcrumb"
                checked={formData.show_breadcrumb}
                onCheckedChange={(checked) => setFormData({ ...formData, show_breadcrumb: checked })}
              />
              <div className="flex-1">
                <Label htmlFor="show_breadcrumb" className="text-sm font-medium cursor-pointer flex items-center gap-2">
                  <Navigation2 className="h-4 w-4 text-blue-500" />
                  {t('Show Breadcrumb')}
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.show_breadcrumb
                    ? t('A stunning breadcrumb hero banner will appear at the top of this page')
                    : t('Enable to show a beautiful page header with navigation breadcrumb trail')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Actions ───────────────────────────────────────────────────────── */}
        <div className="flex justify-end space-x-3 pt-2">
          <Button type="button" variant="outline" onClick={handleCancel}>
            {t('Cancel')}
          </Button>
          <Button type="submit">
            {t('Update Page')}
          </Button>
        </div>
      </form>

      <Toaster />
    </PageTemplate>
  );
}
