package com.example.springrest.domain.menu.service;

import com.example.springrest.domain.menu.model.dto.MenuRequest;
import com.example.springrest.domain.menu.model.dto.MenuResponse;
import com.example.springrest.domain.menu.model.entity.Menu;
import com.example.springrest.domain.menu.model.mapper.MenuDtoMapper;
import com.example.springrest.domain.menu.repository.MenuMapper;
import com.example.springrest.global.common.service.BaseService;
import com.example.springrest.global.model.dto.PageResponse;
import com.example.springrest.global.util.SortValidator;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 메뉴 서비스
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MenuService extends BaseService<Menu, String, MenuMapper> {

    private final MenuMapper menuMapper;
    private final MenuDtoMapper menuDtoMapper;
    private final SortValidator sortValidator;

    @Override
    protected MenuMapper getMapper() {
        return menuMapper;
    }

    @Transactional(readOnly = true)
    public PageResponse<MenuResponse> getAllMenus(int page, int size, String menuName, String category, String useYn,
            String sort) {
        PageHelper.startPage(page, size);

        // Sort validation
        String sortClause = null;
        if (sort != null && !sort.isEmpty()) {
            String[] parts = sort.split(",");
            if (parts.length == 2) {
                // Assuming "menus" is the context for validation
                sortClause = sortValidator.validateAndConvert("menus", parts[0], parts[1]);
            }
        }

        List<Menu> menus = menuMapper.findAllWithSearch(menuName, category, useYn, sortClause);
        PageInfo<Menu> pageInfo = new PageInfo<>(menus);

        return PageResponse.of(pageInfo, menuDtoMapper.toResponseList(menus));
    }

    @Transactional(readOnly = true)
    public MenuResponse getMenuById(String menuId) {
        return menuDtoMapper.toResponse(super.findById(menuId));
    }

    @Transactional
    public void createMenu(MenuRequest request) {
        if (super.findById(request.getMenuId()) != null) {
            throw new IllegalArgumentException("이미 존재하는 메뉴 ID입니다: " + request.getMenuId());
        }
        Menu menu = menuDtoMapper.toEntity(request);
        super.create(menu);
    }

    @Transactional
    public void updateMenu(MenuRequest request) {
        Menu menu = menuDtoMapper.toEntity(request);
        super.update(menu);
    }

    @Transactional
    public void deleteMenu(String menuId) {
        super.delete(menuId);
    }
}
