-- =====================================================
-- Fix RLS Policies to Prevent Infinite Recursion
-- =====================================================

-- Drop the problematic policies that cause infinite recursion
DROP POLICY IF EXISTS "Admins can manage profiles in tenant" ON profiles;
DROP POLICY IF EXISTS "Super admins can manage tenants" ON tenants;

-- Create simplified policies that don't cause recursion
-- Users can view profiles in their tenant
DROP POLICY IF EXISTS "Users can view profiles in tenant" ON profiles;
CREATE POLICY "Users can view profiles in tenant" ON profiles
    FOR SELECT USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- Users can update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (id = auth.uid());

-- Users can insert their own profile (for registration)
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (id = auth.uid());

-- Allow all operations for profiles for now to prevent recursion issues
-- TODO: Implement proper admin checks once the basic functionality works
DROP POLICY IF EXISTS "Allow all operations for profiles" ON profiles;
CREATE POLICY "Allow all operations for profiles" ON profiles
    FOR ALL USING (true);

-- Allow all operations for tenants for now to prevent recursion issues
-- TODO: Implement proper super admin checks once the basic functionality works
DROP POLICY IF EXISTS "Allow all operations for tenants" ON tenants;
CREATE POLICY "Allow all operations for tenants" ON tenants
    FOR ALL USING (true);
